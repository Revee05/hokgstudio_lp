@php
    $settings = \App\Models\Setting::first();
@endphp

<header x-data="{ mobileMenuOpen: false, scrolled: false }" @scroll.window="scrolled = (window.pageYOffset > 20)"
    class="sticky top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300"
    :class="{ 'shadow-sm': scrolled }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <!-- Logo Area -->
            <div class="flex items-center gap-2 flex-1">
                <a href="/" class="flex items-center gap-2 group">
                    @if($settings && $settings->logo_header)
                        <img src="{{ \Illuminate\Support\Facades\Storage::disk('supabase')->url($settings->logo_header) }}"
                            alt="Logo" class="h-10 md:h-12 transition-transform group-hover:scale-105">
                    @else
                        <img src="{{ asset('images/logo_2.svg') }}" alt="Hokgstudio Logo"
                            class="h-10 md:h-12 transition-transform group-hover:scale-105">
                    @endif
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center justify-center gap-8 flex-[2]">
                <a href="/"
                    class="text-sm font-bold text-gray-600 hover:text-[#FF7A00] transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF7A00] hover:after:w-full after:transition-all">Beranda</a>
                <a href="{{ route('tentang-kami') }}"
                    class="text-sm font-bold text-gray-600 hover:text-[#FF7A00] transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF7A00] hover:after:w-full after:transition-all">Tentang
                    Kami</a>

                <!-- Dropdown: Kelas -->
                <div class="relative group" x-data="{ open: false }" @mouseenter="open = true"
                    @mouseleave="open = false">
                    <button
                        class="flex items-center gap-1 text-sm font-bold text-gray-600 group-hover:text-[#FF7A00] transition-colors">
                        Kelas Pelatihan
                        <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180"></i>
                    </button>
                    <div x-show="open" x-transition:enter="transition ease-out duration-200"
                        x-transition:enter-start="opacity-0 translate-y-2"
                        x-transition:enter-end="opacity-100 translate-y-0"
                        class="absolute top-full -left-4 pt-2 w-48 z-50">
                        <div class="bg-white rounded-2xl shadow-xl border border-gray-50 py-2 overflow-hidden">
                            <a href="#"
                                class="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00]">Semua
                                Kelas</a>
                            <a href="#"
                                class="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00]">Web
                                Development</a>
                            <a href="#"
                                class="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00]">UI/UX
                                Design</a>
                        </div>
                    </div>
                </div>

                <!-- Dropdown: Mentor -->
                <div class="relative group" x-data="{ open: false }" @mouseenter="open = true"
                    @mouseleave="open = false">
                    <button
                        class="flex items-center gap-1 text-sm font-bold text-gray-600 group-hover:text-[#FF7A00] transition-colors">
                        Mentor
                        <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180"></i>
                    </button>
                    <div x-show="open" x-transition:enter="transition ease-out duration-200"
                        x-transition:enter-start="opacity-0 translate-y-2"
                        x-transition:enter-end="opacity-100 translate-y-0"
                        class="absolute top-full -left-4 pt-2 w-48 z-50">
                        <div class="bg-white rounded-2xl shadow-xl border border-gray-50 py-2 overflow-hidden">
                            <a href="{{ route('mentor.index') }}"
                                class="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00]">List
                                Mentor</a>
                            <a href="#"
                                class="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00]">Jadi
                                Mentor?</a>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Action Area -->
            <div class="flex items-center justify-end gap-3 md:gap-6 flex-1">
                <button
                    class="p-2 text-gray-500 hover:text-[#FF7A00] transition-colors hidden sm:flex items-center justify-center rounded-full hover:bg-orange-50">
                    <i data-lucide="search" class="w-5 h-5"></i>
                </button>

                @guest
                    <a href="{{ route('login') }}"
                        class="hidden md:inline-flex items-center justify-center bg-primary-gradient text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-0.5 active:scale-95">
                        Log In
                    </a>
                @endguest

                @auth
                    <!-- Profile Dropdown -->
                    <div class="relative hidden md:block" x-data="{ open: false }">
                        <button @click="open = !open" @click.away="open = false"
                            class="flex items-center gap-3 p-1 pr-4 rounded-full bg-gray-50 hover:bg-orange-50 transition-all border border-gray-100 group">
                            <div
                                class="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform overflow-hidden">
                                @if (Auth::user()->role === \App\Enums\UserRole::MENTOR && Auth::user()->mentor?->avatar)
                                    <img src="{{ \Illuminate\Support\Facades\Storage::disk('supabase')->url(Auth::user()->mentor->avatar) }}"
                                        alt="{{ Auth::user()->name }}" class="w-full h-full object-cover">
                                @else
                                    {{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
                                @endif
                            </div>
                            <div class="flex flex-col items-start leading-none">
                                <span class="text-xs font-bold text-gray-900">{{ Auth::user()->name }}</span>
                                <span class="text-[10px] text-gray-500">{{ Auth::user()->role->getFrontendLabel() }}</span>
                            </div>
                            <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 transition-transform"
                                :class="open ? 'rotate-180' : ''"></i>
                        </button>

                        <div x-show="open" x-transition:enter="transition ease-out duration-200"
                            x-transition:enter-start="opacity-0 translate-y-2"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-50 py-2 z-50">
                            <div class="px-4 py-3 border-b border-gray-50 mb-1">
                                <p class="text-xs text-gray-400">Email Anda</p>
                                <p class="text-sm font-bold text-gray-700 truncate">{{ Auth::user()->email }}</p>
                            </div>
                            <a href="{{ Auth::user()->role === \App\Enums\UserRole::ADMIN ? url('/admin') : route('dashboard') }}"
                                class="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00] transition-all">
                                <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                                Dashboard
                            </a>
                            <a href="{{ route('profile.edit') }}"
                                class="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-orange-50 hover:text-[#FF7A00] transition-all">
                                <i data-lucide="user" class="w-4 h-4"></i>
                                Profil Saya
                            </a>
                            <div class="border-t border-gray-50 mt-1 pt-1">
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit"
                                        class="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                                        <i data-lucide="log-out" class="w-4 h-4"></i>
                                        Keluar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                @endauth

                <!-- Mobile Menu Button -->
                <button @click="mobileMenuOpen = !mobileMenuOpen"
                    class="md:hidden p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:text-[#FF7A00] hover:bg-orange-50 transition-all focus:outline-none">
                    <i data-lucide="menu" x-show="!mobileMenuOpen" class="w-6 h-6"></i>
                    <i data-lucide="x" x-show="mobileMenuOpen" class="w-6 h-6" style="display: none;"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div x-show="mobileMenuOpen" x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 -translate-y-10" x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 -translate-y-10"
        class="md:hidden absolute top-full inset-x-0 bg-white shadow-2xl border-t border-gray-50 overflow-hidden"
        style="display: none;">
        <div class="px-6 py-8 space-y-2">
            @auth
                <!-- Mobile User Info -->
                <div class="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl mb-6">
                    <div
                        class="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden">
                        @if (Auth::user()->role === \App\Enums\UserRole::MENTOR && Auth::user()->mentor?->avatar)
                            <img src="{{ \Illuminate\Support\Facades\Storage::disk('supabase')->url(Auth::user()->mentor->avatar) }}"
                                alt="{{ Auth::user()->name }}" class="w-full h-full object-cover">
                        @else
                            {{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
                        @endif
                    </div>
                    <div>
                        <p class="text-base font-bold text-gray-900">{{ Auth::user()->name }}</p>
                        <p class="text-xs text-gray-500">{{ Auth::user()->email }}</p>
                    </div>
                </div>
            @endauth

            <a href="/"
                class="flex items-center px-4 py-3 text-base font-bold text-gray-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded-2xl transition-all">
                Beranda
            </a>
            <a href="{{ route('tentang-kami') }}"
                class="flex items-center px-4 py-3 text-base font-bold text-gray-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded-2xl transition-all">
                Tentang Kami
            </a>

            <!-- Mobile Dropdown: Kelas -->
            <div x-data="{ open: false }">
                <button @click="open = !open"
                    class="flex items-center justify-between w-full px-4 py-3 text-base font-bold text-gray-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded-2xl transition-all">
                    <span>Kelas Pelatihan</span>
                    <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-300"
                        :class="open ? 'rotate-180' : ''"></i>
                </button>
                <div x-show="open" x-collapse class="pl-4 pr-2 py-2 space-y-1">
                    <a href="#"
                        class="block px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF7A00] hover:bg-orange-50 rounded-xl transition-all">Semua
                        Kelas</a>
                    <a href="#"
                        class="block px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF7A00] hover:bg-orange-50 rounded-xl transition-all">Web
                        Development</a>
                    <a href="#"
                        class="block px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF7A00] hover:bg-orange-50 rounded-xl transition-all">UI/UX
                        Design</a>
                </div>
            </div>

            <!-- Mobile Dropdown: Mentor -->
            <div x-data="{ open: false }">
                <button @click="open = !open"
                    class="flex items-center justify-between w-full px-4 py-3 text-base font-bold text-gray-700 hover:text-[#FF7A00] hover:bg-orange-50 rounded-2xl transition-all">
                    <span>Mentor</span>
                    <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-300"
                        :class="open ? 'rotate-180' : ''"></i>
                </button>
                <div x-show="open" x-collapse class="pl-4 pr-2 py-2 space-y-1">
                    <a href="#"
                        class="block px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF7A00] hover:bg-orange-50 rounded-xl transition-all">Daftar
                        Mentor</a>
                    <a href="#"
                        class="block px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF7A00] hover:bg-orange-50 rounded-xl transition-all">Jadi
                        Mentor</a>
                </div>
            </div>

            <!-- Mobile Actions -->
            <div class="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-4">
                @guest
                    <button
                        class="flex items-center gap-3 px-4 py-3.5 text-gray-600 font-bold hover:text-[#FF7A00] hover:bg-orange-50 rounded-2xl transition-all">
                        <i data-lucide="search" class="w-5 h-5 text-gray-400"></i>
                        Cari Pelatihan
                    </button>
                    <a href="{{ route('login') }}"
                        class="flex items-center justify-center bg-primary-gradient text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 active:scale-[0.98] transition-all">
                        Log In Sekarang
                    </a>
                @endguest

                @auth
                    <a href="{{ Auth::user()->role === \App\Enums\UserRole::ADMIN ? url('/admin') : route('dashboard') }}"
                        class="flex items-center gap-3 px-4 py-3.5 text-gray-700 font-bold hover:text-[#FF7A00] hover:bg-orange-50 rounded-2xl transition-all">
                        <i data-lucide="layout-dashboard" class="w-5 h-5 text-gray-400"></i>
                        Dashboard
                    </a>
                    <a href="{{ route('profile.edit') }}"
                        class="flex items-center gap-3 px-4 py-3.5 text-gray-700 font-bold hover:text-[#FF7A00] hover:bg-orange-50 rounded-2xl transition-all">
                        <i data-lucide="user" class="w-5 h-5 text-gray-400"></i>
                        Profil Saya
                    </a>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit"
                            class="flex items-center gap-3 w-full px-4 py-3.5 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all">
                            <i data-lucide="log-out" class="w-5 h-5"></i>
                            Keluar Akun
                        </button>
                    </form>
                @endauth
            </div>
        </div>
    </div>
</header>