@extends('layout.app')

@section('content')
    <div class="bg-[#FCFCFC] pt-32 pb-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Hero Section -->
            @include('pages.courses.sections.bundle_hero')

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
                <!-- Left Column: Content -->
                <div class="lg:col-span-2 space-y-12">
                    <section class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <h2 class="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                            <span class="w-2 h-8 bg-[#FF7A00] rounded-full"></span>
                            Deskripsi Paket
                        </h2>
                        <div class="prose prose-orange max-w-none text-gray-600 leading-relaxed quill-content">
                            {!! $bundle->description !!}
                        </div>
                    </section>

                    @include('pages.courses.sections.bundle_items')
                    @include('pages.courses.sections.mentor', ['course' => (object)['mentor' => $bundle->mentor]])
                </div>

                <!-- Right Column: Sidebar -->
                <div class="lg:col-span-1">
                    @include('pages.courses.sections.sidebar_enroll', ['course' => (object)['price' => $bundle->price]])
                </div>
            </div>
        </div>
    </div>

    <style>
        .quill-content h1 { font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem; color: #111827; }
        .quill-content h2 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: #111827; }
        .quill-content p { margin-bottom: 1rem; }
        .quill-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .quill-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
    </style>
@endsection
