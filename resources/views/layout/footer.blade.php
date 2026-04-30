@php
    $settings = \App\Models\Setting::first();
@endphp

<footer class="bg-white pt-20 pb-10 border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-5 mb-16">
            <!-- Brand -->
            <div class="col-span-1 md:col-span-2 lg:col-span-2 space-y-6">
                <div class="w-auto h-20 flex items-center">
                    @if($settings && $settings->logo_header)
                        <img src="{{ \Illuminate\Support\Facades\Storage::disk('supabase')->url($settings->logo_header) }}"
                            alt="Logo" class="h-12 w-auto">
                    @else
                        <img src="{{ asset('images/logo_2.svg') }}" alt="Logo">
                    @endif
                </div>
                <p class="text-gray-500 text-sm leading-relaxed">
                    {{ $settings->footer_description ?? 'Platform belajar untuk mengembangkan skill digital bersama mentor berpengalaman.' }}
                </p>
            </div>

            <!-- Menu -->
            <div>
            </div>


            <!-- Menu -->
            <div class="col-span-1">
                <h4 class="font-bold text-gray-900 mb-2">Menu</h4>
                <ul class="space-y-4">
                    <li><a href="/" class="text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">Beranda</a>
                    </li>
                    <li><a href="#" class="text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">Kelas</a></li>
                    <li><a href="#" class="text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">Mentor</a></li>
                    <li><a href="{{ route('tentang-kami') }}"
                            class="text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">Tentang
                            Kami</a></li>
                </ul>
            </div>

            <div class="col-span-1">
                <p class="font-bold text-gray-900 mb-3">Ikuti Kami</p>

                <div class="flex flex-col gap-4">
                    @if($settings && $settings->social_links)
                        @foreach($settings->social_links as $social)
                            <a href="{{ $social['url'] }}" target="_blank"
                                class="flex items-center gap-3 text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">
                                @php
                                    $platform = strtolower(trim($social['platform']));
                                    $iconSource = $platform === 'tiktok' ? 'simple-icons:tiktok' : "lucide:{$platform}";
                                @endphp
                                <img src="https://api.iconify.design/{{ $iconSource }}.svg?color=%236b7280"
                                    class="w-5 h-5 transition-colors group-hover:filter-none" alt="{{ $social['platform'] }}">
                                <span>{{ $social['platform'] }}</span>
                            </a>
                        @endforeach
                    @else
                        <!-- Default if empty -->
                        <a href="#"
                            class="flex items-center gap-3 text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">
                            <img src="https://api.iconify.design/lucide:instagram.svg?color=%236b7280" class="w-5 h-5"
                                alt="Instagram">
                            <span>Instagram</span>
                        </a>
                        <a href="#"
                            class="flex items-center gap-3 text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">
                            <img src="https://api.iconify.design/lucide:facebook.svg?color=%236b7280" class="w-5 h-5"
                                alt="Facebook">
                            <span>Facebook</span>
                        </a>
                        <a href="#"
                            class="flex items-center gap-3 text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">
                            <img src="https://api.iconify.design/lucide:youtube.svg?color=%236b7280" class="w-5 h-5"
                                alt="Youtube">
                            <span>Youtube</span>
                        </a>
                        <a href="#"
                            class="flex items-center gap-3 text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">
                            <img src="https://api.iconify.design/simple-icons:tiktok.svg?color=%236b7280" class="w-5 h-5"
                                alt="TikTok">
                            <span>TikTok</span>
                        </a>
                        <a href="#"
                            class="flex items-center gap-3 text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">
                            <img src="https://api.iconify.design/simple-icons:threads.svg?color=%236b7280" class="w-5 h-5"
                                alt="Threads">
                            <span>Threads</span>
                        </a>
                        <a href="#"
                            class="flex items-center gap-3 text-gray-500 hover:text-[#FF7A00] text-sm transition-colors">
                            <img src="https://api.iconify.design/simple-icons:x.svg?color=%236b7280" class="w-5 h-5"
                                alt="X">
                            <span>X</span>
                        </a>
                    @endif
                </div>
            </div>

            <div class="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
                <!-- Office -->
                <div>
                    <h4 class="font-bold text-gray-900 mb-2">Office</h4>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        {{ $settings->address ?? 'Griya Bhayangkara Blok G-23, Kec. Masangan, Sidoarjo, JATIM, IND, 61258' }}
                    </p>
                </div>

                <!-- Website -->
                <div>
                    <h4 class="font-bold text-gray-900 mb-2 md:mb-4">Website Kami</h4>
                    <div class="flex flex-wrap gap-4">
                        @if($settings && $settings->website_links)
                            @foreach($settings->website_links as $link)
                                <a href="{{ $link['url'] }}" target="_blank"
                                    class="text-[#FF7A00] text-sm font-medium hover:underline">
                                    {{ $link['label'] }}
                                </a>
                            @endforeach
                        @endif
                    </div>
                </div>
            </div>

        </div>

        <div class="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-400 text-xs">
                &copy; {{ $settings->copyright_info ?? '2023 - 2024 Learn Hokgstudio. All rights reserved.' }}
            </p>
            <div class="flex gap-6">
                <a href="#" class="text-gray-400 hover:text-gray-600 text-xs transition-colors">Terms of Service</a>
                <a href="#" class="text-gray-400 hover:text-gray-600 text-xs transition-colors">Privacy Policy</a>
            </div>
        </div>
    </div>
</footer>