@extends('layout.app')

@section('content')
    <div class="bg-[#FCFCFC] pt-32 pb-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header & Search -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    Temukan <span class="text-gradient">Skill Baru</span> untuk Masa Depanmu
                </h1>
                <p class="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
                    Pilih program pelatihan terbaik yang dirancang oleh mentor profesional untuk membantu percepatan karirmu.
                </p>

                <!-- Search Bar -->
                <form action="{{ route('courses.index') }}" method="GET" class="max-w-3xl mx-auto relative group">
                    <div class="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF7A00] transition-colors">
                        <i data-lucide="search" class="w-6 h-6"></i>
                    </div>
                    <input type="text" name="search" value="{{ $search }}"
                        placeholder="Cari kelas atau paket pelatihan..."
                        class="w-full pl-16 pr-32 py-5 bg-white rounded-2xl shadow-xl shadow-orange-100/20 border-none focus:ring-2 focus:ring-[#FF7A00] transition-all text-lg placeholder:text-gray-400">
                    <button type="submit"
                        class="absolute right-3 inset-y-3 bg-primary-gradient text-white px-8 rounded-xl font-bold shadow-lg hover:shadow-orange-200 transition-all active:scale-95">
                        Cari
                    </button>
                    @if($categoryName)
                        <input type="hidden" name="category" value="{{ $categoryName }}">
                    @endif
                </form>
            </div>

            <!-- Categories Filter -->
            <div class="flex flex-wrap justify-center gap-3 mb-20">
                <a href="{{ route('courses.index', ['search' => $search]) }}"
                    class="px-6 py-2.5 rounded-full text-sm font-bold transition-all {{ !$categoryName ? 'bg-primary-gradient text-white shadow-lg shadow-orange-200' : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00] border border-gray-100' }}">
                    Semua Kategori
                </a>
                @foreach ($categories as $cat)
                    <a href="{{ route('courses.index', ['category' => $cat, 'search' => $search]) }}"
                        class="px-6 py-2.5 rounded-full text-sm font-bold transition-all {{ $categoryName == $cat ? 'bg-primary-gradient text-white shadow-lg shadow-orange-200' : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00] border border-gray-100' }}">
                        {{ $cat }}
                    </a>
                @endforeach
            </div>

            <!-- Section 1: Paket Kelas (Bundles) -->
            <div class="mb-24">
                <div class="flex justify-between items-center mb-10">
                    <div>
                        <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900">Paket Kelas (Bundles)</h2>
                        <p class="text-gray-500 mt-1">Hemat lebih banyak dengan paket belajar intensif.</p>
                    </div>
                </div>

                @if($bundles->isEmpty())
                    <div class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <i data-lucide="package-search" class="w-16 h-16 text-gray-300 mx-auto mb-4"></i>
                        <h3 class="text-xl font-bold text-gray-900">Belum ada paket tersedia</h3>
                        <p class="text-gray-500">Coba gunakan kata kunci pencarian atau kategori lain.</p>
                    </div>
                @else
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        @foreach ($bundles as $bundle)
                            <div class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
                                <div class="relative aspect-[16/10] overflow-hidden">
                                    <img src="{{ $bundle->thumbnail_url ?: asset('images/default_bundle.png') }}"
                                        alt="{{ $bundle->title }}"
                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                    <div class="absolute top-4 left-4 bg-[#FF7A00] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">
                                        Bundle Hemat
                                    </div>
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <button class="w-full py-3 bg-white text-[#FF7A00] font-bold rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                                <div class="p-6 flex flex-col flex-1">
                                    <div class="flex flex-wrap items-center gap-2 mb-3">
                                        <div class="flex text-yellow-400">
                                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                                        </div>
                                        <span class="text-xs font-bold text-gray-900">4.9</span>
                                        <span class="text-xs text-gray-400">({{ count($bundle->courses) }} Kelas)</span>
                                        @foreach($bundle->categories as $cat)
                                            <span class="text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                                                {{ $cat->name }}
                                            </span>
                                        @endforeach
                                    </div>
                                    <h3 class="font-bold text-gray-900 mb-2 group-hover:text-[#FF7A00] transition-colors leading-snug line-clamp-2">
                                        {{ $bundle->title }}
                                    </h3>
                                    <p class="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">
                                        {{ $bundle->description }}
                                    </p>
                                    <div class="flex items-center gap-2 mb-4">
                                        <div class="w-6 h-6 rounded-full bg-gray-100 overflow-hidden border border-gray-100">
                                            @if($bundle->mentor->avatar_url)
                                                <img src="{{ $bundle->mentor->avatar_url }}" class="w-full h-full object-cover">
                                            @else
                                                <div class="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                                                    {{ substr($bundle->mentor->user->name, 0, 1) }}
                                                </div>
                                            @endif
                                        </div>
                                        <span class="text-xs text-gray-500">{{ $bundle->mentor->user->name }}</span>
                                    </div>
                                    <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <div>
                                            <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Harga Paket</p>
                                            <p class="text-lg font-extrabold text-[#FF7A00]">
                                                Rp {{ number_format($bundle->price, 0, ',', '.') }}
                                            </p>
                                        </div>
                                        <div class="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#FF7A00]">
                                            <i data-lucide="arrow-right" class="w-4 h-4"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="mt-12 flex justify-center">
                        {{ $bundles->appends(['search' => $search, 'category' => $categoryName, 'courses_page' => $courses->currentPage()])->links('pagination::tailwind') }}
                    </div>
                @endif
            </div>

            <!-- Section 2: Kelas per Item (Individual Courses) -->
            <div>
                <div class="flex justify-between items-center mb-10">
                    <div>
                        <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900">Kelas</h2>
                        <p class="text-gray-500 mt-1">Fokus pada satu skill spesifik untuk hasil maksimal.</p>
                    </div>
                </div>

                @if($courses->isEmpty())
                    <div class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <i data-lucide="book-open" class="w-16 h-16 text-gray-300 mx-auto mb-4"></i>
                        <h3 class="text-xl font-bold text-gray-900">Belum ada kelas tersedia</h3>
                        <p class="text-gray-500">Coba gunakan kata kunci pencarian atau kategori lain.</p>
                    </div>
                @else
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        @foreach ($courses as $course)
                            <div class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
                                <div class="relative aspect-video overflow-hidden">
                                    <img src="{{ $course->thumbnail_url ?: asset('images/default_course.png') }}"
                                        alt="{{ $course->title }}"
                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                    <div class="absolute top-4 left-4 flex flex-col gap-2">
                                        <div class="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm w-fit">
                                            @if($course->type === 'product')
                                                Product
                                            @else
                                                {{ $course->mode == 'online' ? 'Online Class' : 'Offline Class' }}
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="p-6 flex flex-col flex-1">
                                    <div class="flex items-center gap-2 mb-3">
                                        <span class="text-[10px] font-bold text-[#FF7A00] bg-orange-50 px-2 py-1 rounded">
                                            {{ $course->categories->first()->name ?? 'Umum' }}
                                        </span>
                                    </div>
                                    <h3 class="font-bold text-gray-900 mb-4 group-hover:text-[#FF7A00] transition-colors leading-snug line-clamp-2">
                                        {{ $course->title }}
                                    </h3>
                                    <div class="flex items-center gap-2 mb-4">
                                        <div class="w-6 h-6 rounded-full bg-gray-100 overflow-hidden">
                                            @if($course->mentor->avatar_url)
                                                <img src="{{ $course->mentor->avatar_url }}" class="w-full h-full object-cover">
                                            @else
                                                <div class="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                                                    {{ substr($course->mentor->user->name, 0, 1) }}
                                                </div>
                                            @endif
                                        </div>
                                        <span class="text-xs text-gray-500">{{ $course->mentor->user->name }}</span>
                                    </div>
                                    <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <p class="text-lg font-extrabold text-[#FF7A00]">
                                            Rp {{ number_format($course->price, 0, ',', '.') }}
                                        </p>
                                        <button class="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#FF7A00] group-hover:text-white transition-all">
                                            <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="mt-12 flex justify-center">
                        {{ $courses->appends(['search' => $search, 'category' => $categoryName, 'bundles_page' => $bundles->currentPage()])->links('pagination::tailwind') }}
                    </div>
                @endif
            </div>
        </div>
    </div>
@endsection
