@extends('layout.app')

@section('content')
    <!-- Modular Sections -->
    @include('pages.home.sections.hero')
    @include('pages.home.sections.courses')
    @include('pages.home.sections.testimonials')
    @include('pages.home.sections.cta')
    @include('pages.home.sections.steps')
@endsection
