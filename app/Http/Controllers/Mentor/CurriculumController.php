<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CurriculumController extends Controller
{
    public function index(Course $course)
    {
        $course->load(['modules.lessons.quiz.questions.options']);
        
        return Inertia::render('Mentor/Courses/Curriculum', [
            'course' => $course
        ]);
    }

    public function storeModule(Request $request, Course $course)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $course->modules()->create([
            'title' => $request->title,
            'order' => $course->modules()->count()
        ]);

        return back()->with('success', 'Module created successfully.');
    }

    public function storeLesson(Request $request, Module $module)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content_type' => 'required|in:video,article,quiz',
        ]);

        $module->lessons()->create([
            'title' => $request->title,
            'content_type' => $request->content_type,
            'order' => $module->lessons()->count()
        ]);

        return back()->with('success', 'Lesson created successfully.');
    }

    public function updateLesson(Request $request, Lesson $lesson)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content_data' => 'nullable|string',
            'extra_description' => 'nullable|string',
        ]);

        // Get old paths for cleanup
        $oldContent = $lesson->content_data . ' ' . $lesson->extra_description;
        $newContent = $request->content_data . ' ' . $request->extra_description;

        $lesson->update($request->only('title', 'content_data', 'extra_description'));

        // Cleanup orphaned images
        $this->cleanupOrphanedImages($oldContent, $newContent);

        return back()->with('success', 'Lesson updated successfully.');
    }

    private function cleanupOrphanedImages($oldHtml, $newHtml)
    {
        $extractPaths = function($html) {
            if (!$html) return [];
            // Match supabase storage URLs
            $pattern = '/https:\/\/himqfszisljcotjdnxcd\.supabase\.co\/storage\/v1\/object\/public\/hokgstudio_lp\/(editor\/images\/[^\s"\'>]+)/';
            preg_match_all($pattern, $html, $matches);
            return $matches[1] ?? [];
        };

        $oldPaths = $extractPaths($oldHtml);
        $newPaths = $extractPaths($newHtml);

        $toDelete = array_diff($oldPaths, $newPaths);

        foreach ($toDelete as $path) {
            \Illuminate\Support\Facades\Storage::disk('supabase')->delete($path);
        }
    }

    public function destroyModule(Module $module)
    {
        $module->delete();
        return back()->with('success', 'Module deleted successfully.');
    }

    public function destroyLesson(Lesson $lesson)
    {
        $lesson->delete();
        return back()->with('success', 'Lesson deleted successfully.');
    }

    public function storeQuestion(Request $request, Lesson $lesson)
    {
        $request->validate([
            'question_text' => 'required|string',
            'type' => 'required|in:multiple_choice,essay',
            'options' => 'required_if:type,multiple_choice|array',
        ]);

        if (!$lesson->quiz) {
            $lesson->quiz()->create(['title' => 'Quiz for ' . $lesson->title]);
        }

        $question = $lesson->quiz->questions()->create([
            'question_text' => $request->question_text,
            'type' => $request->type
        ]);

        if ($request->type === 'multiple_choice') {
            foreach ($request->options as $opt) {
                $question->options()->create([
                    'option_text' => $opt['text'],
                    'is_correct' => $opt['is_correct'] ?? false
                ]);
            }
        }

        return back()->with('success', 'Question added successfully.');
    }

    public function updateQuiz(Request $request, \App\Models\Quiz $quiz)
    {
        $request->validate([
            'duration' => 'nullable|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
        ]);

        $quiz->update($request->only('duration', 'passing_score'));

        return back()->with('success', 'Quiz settings updated.');
    }

    public function destroyQuestion(Question $question)
    {
        $question->delete();
        return back()->with('success', 'Question deleted successfully.');
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('editor/images', 'supabase');
            // Get public URL from env or build it correctly
            $baseUrl = env('SUPABASE_STORAGE_URL');
            $url = $baseUrl . '/' . $path;
            
            return response()->json(['url' => $url]);
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }
}
