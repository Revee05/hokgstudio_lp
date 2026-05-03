<section class="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
    <h2 class="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
        <span class="w-2 h-8 bg-[#FF7A00] rounded-full"></span>
        Tentang Kelas Ini
    </h2>
    
    <div class="prose prose-orange max-w-none text-gray-600 leading-relaxed quill-content">
        {!! $course->description !!}
    </div>
</section>

<style>
    .quill-content h1 { font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem; color: #111827; }
    .quill-content h2 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: #111827; }
    .quill-content p { margin-bottom: 1rem; }
    .quill-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
    .quill-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
    .quill-content img { border-radius: 1rem; margin: 1.5rem 0; }
</style>
