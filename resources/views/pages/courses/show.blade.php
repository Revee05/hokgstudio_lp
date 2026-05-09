@extends('layout.app')

@section('content')
    <div class="bg-[#FCFCFC] pt-32 pb-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Hero Section -->
            @include('pages.courses.sections.hero')

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
                <!-- Left Column: Content -->
                <div class="lg:col-span-2 space-y-12">
                    @include('pages.courses.sections.about')
                    @include('pages.courses.sections.curriculum')
                    @include('pages.courses.sections.mentor')
                </div>

                <!-- Right Column: Sidebar / Enroll -->
                <div class="lg:col-span-1">
                    @include('pages.courses.sections.sidebar_enroll', ['payable' => $course, 'type' => 'course'])
                </div>
            </div>
        </div>
    </div>
@endsection
