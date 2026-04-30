@extends('layout.app')

@section('content')
<section class="py-20 px-4 md:px-0">
    <div class="max-w-6xl mx-auto">
        <!-- Section 1: About -->
        <div class="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div class="w-full md:w-1/2">
                <h1 class="text-4xl md:text-5xl font-extrabold mb-8 relative inline-block">
                    Tentang <span class="text-[#FF7A00]">{{ str_replace('Tentang ', '', $about->about_title) }}</span>
                    <div class="absolute bottom-0 left-0 w-full h-1.5 bg-[#00A3FF] -mb-2"></div>
                </h1>
                <div class="text-gray-600 leading-relaxed space-y-4">
                    {!! nl2br(e($about->about_description)) !!}
                </div>
            </div>
            <div class="w-full md:w-1/2">
                @if($about->about_image)
                    <img src="{{ \Illuminate\Support\Facades\Storage::disk('supabase')->url($about->about_image) }}" alt="About Us" class="w-full h-auto rounded-2xl shadow-2xl">
                @else
                    <div class="w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center">
                        <i data-lucide="image" class="w-16 h-16 text-gray-400"></i>
                    </div>
                @endif
            </div>
        </div>

        <!-- Section 2: Team -->
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
                Tim <span class="text-[#FF7A00]">Hokgstudio Academy</span>
            </h2>
            <p class="text-gray-500 max-w-2xl mx-auto">
                Kekuatan kami terletak pada kebersamaan dan kolaborasi. Temukan kisah balik setiap individu yang berkontribusi dalam perjalanan kami.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            @forelse($about->team_members ?? [] as $member)
                <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                    <div class="h-80 overflow-hidden bg-gray-100">
                        @if(isset($member['photo']))
                            <img src="{{ \Illuminate\Support\Facades\Storage::disk('supabase')->url($member['photo']) }}" alt="{{ $member['name'] }}" class="w-full h-full object-cover">
                        @else
                            <div class="w-full h-full flex items-center justify-center">
                                <i data-lucide="user" class="w-20 h-20 text-gray-300"></i>
                            </div>
                        @endif
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-1">{{ $member['name'] }}</h3>
                        <p class="text-pink-500 font-medium text-sm mb-4">{{ $member['role'] }}</p>
                        <div class="flex gap-3">
                            @if(isset($member['email']))
                                <a href="mailto:{{ $member['email'] }}" class="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <i data-lucide="mail" class="w-5 h-5 text-gray-600"></i>
                                </a>
                            @endif
                            @if(isset($member['instagram_url']))
                                <a href="{{ $member['instagram_url'] }}" target="_blank" class="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <i data-lucide="instagram" class="w-5 h-5 text-gray-600"></i>
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            @empty
                <!-- Empty state handled or show placeholders if needed -->
            @endforelse
        </div>

        <!-- Section 3: How to Learn -->
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-extrabold mb-12">
                Bagaimana Cara Belajar di <span class="text-[#FF7A00]">Hokgstudio Academy</span>
            </h2>
            
            <div class="relative">
                <!-- Dashed line for desktop -->
                <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-200 -z-10"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    @foreach($about->learning_steps ?? [] as $index => $step)
                        <div class="flex flex-col items-center">
                            <div class="w-24 h-24 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center mb-6 relative">
                                <div class="absolute -top-2 -left-2 w-6 h-6 bg-[#FF7A00] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {{ $index + 1 }}
                                </div>
                                <i data-lucide="{{ $step['icon'] ?? 'check-circle' }}" class="w-10 h-10 text-[#FF7A00]"></i>
                            </div>
                            <h4 class="font-bold text-lg mb-2">{{ $step['title'] }}</h4>
                            <p class="text-gray-500 text-sm leading-relaxed">
                                {{ $step['description'] }}
                            </p>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <!-- Section 4: CTA -->
        <div class="mt-24 bg-primary-gradient rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <!-- Decorative circle -->
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
            
            <h2 class="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">{{ $about->cta_title }}</h2>
            <p class="text-white/90 max-w-3xl mx-auto mb-10 text-lg relative z-10">
                {{ $about->cta_description }}
            </p>
            
            <div class="flex flex-col md:flex-row justify-center gap-4 relative z-10">
                <a href="{{ $about->cta_wa_link }}" target="_blank" class="bg-white text-[#FF7A00] font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-lg text-lg">
                    Customer Services
                </a>
                <a href="{{ $about->cta_form_link }}" target="_blank" class="bg-[#FF7A00] border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all shadow-lg text-lg">
                    Formulir Kolaborasi
                </a>
            </div>
        </div>
    </div>
</section>
@endsection
