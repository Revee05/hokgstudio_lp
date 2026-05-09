import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

import RichTextEditor from '@/Components/RichTextEditor';

export default function Curriculum({ auth, course }) {
    const [showModuleModal, setShowModuleModal] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [showEditLessonModal, setShowEditLessonModal] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);

    const moduleForm = useForm({
        title: '',
    });

    const lessonForm = useForm({
        title: '',
        content_type: 'video',
    });

    const editLessonForm = useForm({
        title: '',
        content_data: '',
        extra_description: '',
    });

    const questionForm = useForm({
        question_text: '',
        type: 'multiple_choice',
        options: [
            { text: '', is_correct: true },
            { text: '', is_correct: false },
        ]
    });

    const quizSettingsForm = useForm({
        duration: '',
        passing_score: 80,
    });

    const submitModule = (e) => {
        e.preventDefault();
        moduleForm.post(route('mentor.courses.modules.store', course.slug), {
            onSuccess: () => {
                setShowModuleModal(false);
                moduleForm.reset();
            },
        });
    };

    const submitLesson = (e) => {
        e.preventDefault();
        lessonForm.post(route('mentor.modules.lessons.store', selectedModule.id), {
            onSuccess: () => {
                setShowLessonModal(false);
                lessonForm.reset();
            },
        });
    };

    const submitEditLesson = (e) => {
        e.preventDefault();
        editLessonForm.patch(route('mentor.lessons.update', editingLesson.slug), {
            onSuccess: () => {
                setShowEditLessonModal(false);
                editLessonForm.reset();
            },
        });
    };

    const submitQuestion = (e) => {
        e.preventDefault();
        questionForm.post(route('mentor.lessons.questions.store', currentLessonData.slug), {
            onSuccess: () => {
                questionForm.reset();
            },
        });
    };

    const submitQuizSettings = (e) => {
        e.preventDefault();
        quizSettingsForm.patch(route('mentor.quizzes.update_settings', currentLessonData.quiz.id), {
            onSuccess: () => {
                // Settings saved
            }
        });
    };

    // Helper to get the most up-to-date lesson data from the course prop
    const getUpdatedLesson = () => {
        if (!editingLesson) return null;
        for (const m of course.modules) {
            const found = m.lessons.find(l => l.id === editingLesson.id);
            if (found) return found;
        }
        return editingLesson;
    };

    const currentLessonData = getUpdatedLesson();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Manajemen Kurikulum: {course.title}
                    </h2>
                    <Link
                        href={route('mentor.courses.edit', course.slug)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Back to Courses
                    </Link>
                </div>
            }
        >
            <Head>
                <title>Manage Curriculum</title>
                <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
                <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header Action */}
                    <div className="flex justify-end">
                        <PrimaryButton onClick={() => setShowModuleModal(true)}>
                            + Add Module
                        </PrimaryButton>
                    </div>

                    {/* Modules List */}
                    {course.modules.length === 0 ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-12 text-center border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">No modules yet. Start by adding your first module.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {course.modules.map((module) => (
                                <div key={module.id} className="bg-white shadow-sm sm:rounded-2xl border border-gray-100 overflow-hidden">
                                    <div className="p-6 flex justify-between items-center border-b border-gray-50 bg-gray-50/50">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{module.title}</h3>
                                            <p className="text-xs text-gray-500">{module.lessons.length} Lessons</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => {
                                                    setSelectedModule(module);
                                                    setShowLessonModal(true);
                                                }}
                                                className="text-xs font-bold text-orange-600 hover:text-orange-700 px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all"
                                            >
                                                + Add Lesson
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="divide-y divide-gray-50">
                                        {module.lessons.map((lesson) => (
                                            <div key={lesson.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-xl ${
                                                        lesson.content_type === 'video' ? 'bg-blue-50 text-blue-600' :
                                                        lesson.content_type === 'quiz' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'
                                                    }`}>
                                                        {lesson.content_type === 'video' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>}
                                                        {lesson.content_type === 'quiz' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path d="M7 3a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1H7z"/></svg>}
                                                        {lesson.content_type === 'article' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/></svg>}
                                                    </div>
                                                    <span className="font-medium text-gray-700">{lesson.title}</span>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                                                     <button 
                                                        onClick={() => {
                                                            setEditingLesson(lesson);
                                                            editLessonForm.setData({
                                                                title: lesson.title,
                                                                content_data: lesson.content_data || '',
                                                                extra_description: lesson.extra_description || '',
                                                            });
                                                            setShowEditLessonModal(true);
                                                        }}
                                                        className="text-xs text-orange-600 font-bold hover:underline"
                                                    >
                                                        Edit Content
                                                    </button>
                                                    {lesson.content_type === 'quiz' && (
                                                        <button 
                                                            onClick={() => {
                                                            setEditingLesson(lesson);
                                                            if (lesson.quiz) {
                                                                quizSettingsForm.setData({
                                                                    duration: lesson.quiz.duration || '',
                                                                    passing_score: lesson.quiz.passing_score || 80,
                                                                });
                                                            }
                                                            setShowQuizModal(true);
                                                            }}
                                                            className="text-xs text-purple-600 font-bold hover:underline"
                                                        >
                                                            Manage Questions
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Module Modal */}
            {showModuleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Add New Module</h2>
                        <form onSubmit={submitModule} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="module_title" value="Module Title" />
                                <TextInput
                                    id="module_title"
                                    className="mt-1 block w-full"
                                    value={moduleForm.data.title}
                                    onChange={(e) => moduleForm.setData('title', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setShowModuleModal(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                                <PrimaryButton disabled={moduleForm.processing}>Save Module</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Lesson Modal */}
            {showLessonModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Add Lesson to {selectedModule?.title}</h2>
                        <form onSubmit={submitLesson} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="lesson_title" value="Lesson Title" />
                                <TextInput
                                    id="lesson_title"
                                    className="mt-1 block w-full"
                                    value={lessonForm.data.title}
                                    onChange={(e) => lessonForm.setData('title', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="content_type" value="Content Type" />
                                <select
                                    id="content_type"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-2xl shadow-sm"
                                    value={lessonForm.data.content_type}
                                    onChange={(e) => lessonForm.setData('content_type', e.target.value)}
                                >
                                    <option value="video">Video</option>
                                    <option value="article">Article</option>
                                    <option value="quiz">Quiz</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setShowLessonModal(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                                <PrimaryButton disabled={lessonForm.processing}>Create Lesson</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Lesson Modal */}
            {showEditLessonModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Edit Lesson: {editingLesson?.title}</h2>
                        <form onSubmit={submitEditLesson} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="edit_lesson_title" value="Lesson Title" />
                                <TextInput
                                    id="edit_lesson_title"
                                    className="mt-1 block w-full"
                                    value={editLessonForm.data.title}
                                    onChange={(e) => editLessonForm.setData('title', e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="content_data" value={editingLesson?.content_type === 'video' ? 'Video Embed URL' : 'Content (Rich Text Article)'} />
                                {editingLesson?.content_type === 'video' ? (
                                    <TextInput
                                        id="content_data"
                                        className="mt-1 block w-full"
                                        value={editLessonForm.data.content_data}
                                        onChange={(e) => editLessonForm.setData('content_data', e.target.value)}
                                        placeholder="https://www.youtube.com/embed/..."
                                    />
                                ) : (
                                    <RichTextEditor 
                                        value={editLessonForm.data.content_data} 
                                        onChange={(val) => editLessonForm.setData('content_data', val)}
                                    />
                                )}
                                {editingLesson?.content_type === 'video' && (
                                    <p className="mt-1 text-[10px] text-gray-400 italic">Gunakan link embed (misal: https://www.youtube.com/embed/dQw4w9WgXcQ)</p>
                                )}
                            </div>

                            {editingLesson?.content_type === 'video' && (
                                <div className="mt-4">
                                    <InputLabel htmlFor="extra_description" value="Info Tambahan (Rich Text)" />
                                    <RichTextEditor 
                                        value={editLessonForm.data.extra_description} 
                                        onChange={(val) => editLessonForm.setData('extra_description', val)}
                                        placeholder="Tambahkan info detail seputar video ini..."
                                    />
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setShowEditLessonModal(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                                <PrimaryButton disabled={editLessonForm.processing}>Update Lesson</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Quiz Management Modal */}
            {showQuizModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Quiz Builder: {currentLessonData?.title}</h2>
                            <button onClick={() => setShowQuizModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>

                        {/* Quiz Settings Bar */}
                        {currentLessonData?.quiz && (
                            <form onSubmit={submitQuizSettings} className="mb-8 p-6 bg-orange-50 rounded-3xl border border-orange-100 flex flex-wrap gap-6 items-end">
                                <div className="flex-1 min-w-[150px]">
                                    <InputLabel value="Timer (Minutes)" className="text-orange-700" />
                                    <TextInput 
                                        type="number"
                                        placeholder="No limit"
                                        className="w-full mt-1 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        value={quizSettingsForm.data.duration}
                                        onChange={(e) => quizSettingsForm.setData('duration', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <InputLabel value="Passing Score (%)" className="text-orange-700" />
                                    <TextInput 
                                        type="number"
                                        className="w-full mt-1 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        value={quizSettingsForm.data.passing_score}
                                        onChange={(e) => quizSettingsForm.setData('passing_score', e.target.value)}
                                    />
                                </div>
                                <PrimaryButton disabled={quizSettingsForm.processing} className="bg-orange-600 hover:bg-orange-700">
                                    Update Settings
                                </PrimaryButton>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Form Tambah Pertanyaan */}
                            <div className="space-y-6">
                                <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Add New Question</h3>
                                <form onSubmit={submitQuestion} className="space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                    <div>
                                        <InputLabel value="Question Text" />
                                        <TextInput 
                                            className="w-full mt-1" 
                                            value={questionForm.data.question_text}
                                            onChange={(e) => questionForm.setData('question_text', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Question Type" />
                                        <select 
                                            className="w-full mt-1 border-gray-300 focus:border-indigo-500 rounded-2xl shadow-sm"
                                            value={questionForm.data.type}
                                            onChange={(e) => questionForm.setData('type', e.target.value)}
                                        >
                                            <option value="multiple_choice">Multiple Choice (Pilihan Ganda)</option>
                                            <option value="essay">Essay (Isian Esai)</option>
                                        </select>
                                    </div>

                                    {questionForm.data.type === 'multiple_choice' && (
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <InputLabel value="Options (Check radio for Answer Key)" />
                                                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Kunci Jawaban</span>
                                            </div>
                                            {questionForm.data.options.map((opt, index) => (
                                                <div key={index} className={`flex gap-3 items-center p-2 rounded-2xl border-2 transition-all ${opt.is_correct ? 'border-green-200 bg-green-50/50' : 'border-transparent'}`}>
                                                    <div className="flex flex-col items-center gap-1">
                                                        <input 
                                                            type="radio" 
                                                            name="correct_option"
                                                            className="text-green-600 focus:ring-green-500 w-5 h-5"
                                                            checked={opt.is_correct}
                                                            onChange={() => {
                                                                const newOpts = questionForm.data.options.map((o, i) => ({...o, is_correct: i === index}));
                                                                questionForm.setData('options', newOpts);
                                                            }}
                                                        />
                                                    </div>
                                                    <TextInput 
                                                        className="flex-1 text-sm border-gray-200" 
                                                        value={opt.text}
                                                        placeholder={`Option ${index + 1}`}
                                                        onChange={(e) => {
                                                            const newOpts = [...questionForm.data.options];
                                                            newOpts[index].text = e.target.value;
                                                            questionForm.setData('options', newOpts);
                                                        }}
                                                        required
                                                    />
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            const newOpts = questionForm.data.options.filter((_, i) => i !== index);
                                                            questionForm.setData('options', newOpts);
                                                        }}
                                                        className="text-red-400 hover:text-red-600"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                    </button>
                                                </div>
                                            ))}
                                            <button 
                                                type="button" 
                                                onClick={() => questionForm.setData('options', [...questionForm.data.options, { text: '', is_correct: false }])}
                                                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 mt-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                                                Add Option
                                            </button>
                                        </div>
                                    )}

                                    <PrimaryButton disabled={questionForm.processing} className="w-full justify-center">
                                        Save Question
                                    </PrimaryButton>
                                </form>
                            </div>

                            {/* Daftar Pertanyaan */}
                            <div className="space-y-6">
                                <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Questions List</h3>
                                <div className="space-y-4">
                                    {!currentLessonData?.quiz || currentLessonData?.quiz?.questions?.length === 0 ? (
                                        <p className="text-gray-400 text-sm italic">No questions yet. Add your first question to initialize the quiz.</p>
                                    ) : (
                                        currentLessonData?.quiz?.questions?.map((q) => (
                                            <div key={q.id} className="p-4 bg-white border border-gray-100 rounded-2xl flex justify-between items-start gap-4 shadow-sm">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                                                            q.type === 'essay' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                                        }`}>
                                                            {q.type}
                                                        </span>
                                                        <p className="font-bold text-sm leading-tight">{q.question_text}</p>
                                                    </div>
                                                    {q.type === 'multiple_choice' && (
                                                        <div className="ml-4 space-y-1 mt-2">
                                                            {q.options?.map((o) => (
                                                                <div key={o.id} className="flex items-center gap-2 text-[10px]">
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${o.is_correct ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                                    <span className={o.is_correct ? 'font-bold text-green-600' : 'text-gray-500'}>{o.option_text}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        if (confirm('Delete this question?')) {
                                                            router.delete(route('mentor.questions.destroy', q.id));
                                                        }
                                                    }}
                                                    className="text-red-400 hover:text-red-600 p-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
