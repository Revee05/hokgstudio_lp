<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center gap-2">
                <img src="{{ asset('images/logo_2.svg') }}" alt="" class="h-12">
            </div>

            <!-- Navigation -->
            <nav class="hidden md:flex space-x-8">
                <a href="#" class="text-sm font-semibold text-gray-600 hover:text-[#FF7A00] transition-colors">Beranda</a>
                <a href="#" class="text-sm font-semibold text-gray-600 hover:text-[#FF7A00] transition-colors">Tentang Kami</a>
                <div class="relative group">
                    <button class="flex items-center gap-1 text-sm font-semibold text-gray-600 group-hover:text-[#FF7A00] transition-colors">
                        Kelas Pelatihan
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </button>
                    <!-- Dropdown could go here -->
                </div>
                <div class="relative group">
                    <button class="flex items-center gap-1 text-sm font-semibold text-gray-600 group-hover:text-[#FF7A00] transition-colors">
                        Mentor
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </button>
                    <!-- Dropdown could go here -->
                </div>
            </nav>

            <!-- Actions -->
            <div class="flex items-center gap-4">
                <button class="p-2 text-gray-500 hover:text-[#FF7A00] transition-colors">
                    <i data-lucide="search" class="w-5 h-5"></i>
                </button>
                <a href="#" class="bg-primary-gradient text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-0.5">
                    Masuk
                </a>
            </div>
        </div>
    </div>
</header>
