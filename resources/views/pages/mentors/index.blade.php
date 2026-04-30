@extends('layout.app')

@section('content')
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <!-- Header Section -->
        <div class="text-center mb-8 md:mb-12">
            <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Mentor Kelas <span class="text-gradient">Hokgstudio Academy</span>
            </h1>
            <p class="text-gray-500 max-w-4xl mx-auto leading-relaxed text-sm md:text-base px-2">
                Hokgstudio Academy memfasilitasi Anda dalam mengembangkan skill melalui mentor-mentor kami yang telah teruji
                kompetensi dan profesionalisme kerja karena telah banyak memiliki pengalaman pada bidang ilmu yang telah
                disesuaikan dengan ketersediaan kelas yang tersedia.
            </p>
        </div>

        <!-- Search & Filter Section -->
        <div class="flex flex-wrap gap-4 mb-10">
            <div class="flex-1 min-w-[280px] relative">
                <form action="{{ route('mentor.index') }}" method="GET" class="relative h-full">
                    <input type="text" name="search" value="{{ request('search') }}" placeholder="Cari Mentor"
                        class="w-full h-full pl-5 pr-12 py-3.5 md:py-1 rounded-xl border border-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none text-gray-700">
                    <button type="submit" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800">
                        <i data-lucide="search" class="w-5 h-5"></i>
                    </button>
                </form>
            </div>
            <div class="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                    class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 md:px-5 py-3.5 md:py-3 rounded-xl border border-gray-800 text-gray-800 font-medium hover:bg-gray-50 transition-all whitespace-nowrap text-sm md:text-base">
                    <i data-lucide="filter" class="w-4 h-4 md:w-5 md:h-5"></i>
                    filters
                </button>
                <button
                    class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 md:px-5 py-3.5 md:py-3 rounded-xl border border-gray-800 text-gray-800 font-medium hover:bg-gray-50 transition-all whitespace-nowrap text-sm md:text-base">
                    <i data-lucide="arrow-up-down" class="w-4 h-4 md:w-5 md:h-5"></i>
                    sort by
                </button>
            </div>
        </div>

        <!-- Mentor Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            @forelse($mentors as $mentor)
                <div
                    class="bg-white rounded-lg border border-orange-light p-2 lg:p-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 shadow-md hover:shadow-xl transition-all duration-300">
                    <!-- Avatar -->
                    <div
                        class="w-full aspect-square md:h-[180px] lg:h-[224px] rounded-sm md:rounded-xl lg:rounded-3xl overflow-hidden shadow-sm">
                        @if($mentor->avatar)
                            <img src="{{ \Illuminate\Support\Facades\Storage::disk('supabase')->url($mentor->avatar) }}"
                                alt="{{ $mentor->name }}" class="w-full h-full object-cover">
                        @else
                            <div class="w-full h-full bg-gray-50 flex items-center justify-center">
                                <i data-lucide="user" class="w-10 h-10 md:w-12 md:h-12 text-gray-200"></i>
                            </div>
                        @endif
                    </div>

                    <!-- Info -->
                    <div class="flex flex-col justify-between py-1">
                        <div class="space-y-2">
                            <div>
                                <h3 class="text-lg md:text-xl font-bold text-orange-light-2 leading-tight">{{ $mentor->name }}
                                </h3>
                                <p class="text-gray-900 font-bold text-sm md:text-base">{{ $mentor->city ?? 'Lokasi' }}</p>
                            </div>

                            <p class="text-zinc-600 text-[10px] md:text-[11px] leading-relaxed line-clamp-3">
                                {{ $mentor->bio ?? 'Mentor profesional di Hokgstudio Academy yang siap membimbing Anda mencapai kesuksesan.' }}
                            </p>
                        </div>

                        <div class="pt-3 md:pt-4 space-y-1">
                            <div
                                class="grid grid-cols-[100px_10px_1fr] md:grid-cols-[110px_10px_1fr] text-[10px] md:text-[11px] leading-tight">
                                <span class="font-bold text-[#D47A2C]">Berpengalaman</span>
                                <span class="font-bold text-[#D47A2C]">:</span>
                                <span class="text-[#FF7A00] font-semibold">{{ $mentor->experience ?? '-' }}</span>
                            </div>
                            <div
                                class="grid grid-cols-[100px_10px_1fr] md:grid-cols-[110px_10px_1fr] text-[10px] md:text-[11px] leading-tight">
                                <span class="font-bold text-[#D47A2C]">Sertifikasi</span>
                                <span class="font-bold text-[#D47A2C]">:</span>
                                <span class="text-gray-600 leading-snug">{{ $mentor->certification ?? '-' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100">
                    <p class="text-gray-400">Belum ada mentor yang tersedia.</p>
                </div>
            @endforelse
        </div>

        <!-- Pagination -->
        <div class="mt-8 md:mt-12 flex justify-center items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-[#FF7A00]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#FF7A00]/30"></div>
        </div>
    </div>

    <style>
        /* Reset some default styles if needed */
        .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    </style>
@endsection