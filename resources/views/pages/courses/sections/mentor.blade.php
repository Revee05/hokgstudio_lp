<section class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
    <h2 class="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
        <span class="w-2 h-6 bg-[#FF7A00] rounded-full"></span>
        Mentor Profesional
    </h2>

    <div class="flex items-start gap-6">
        <div class="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-orange-50 flex-shrink-0">
            @if($course->mentor->avatar_url)
                <img src="{{ $course->mentor->avatar_url }}" class="w-full h-full object-cover">
            @else
                <div class="w-full h-full bg-orange-100 flex items-center justify-center text-[#FF7A00] font-black text-2xl uppercase">
                    {{ substr($course->mentor->user->name, 0, 1) }}
                </div>
            @endif
        </div>
        
        <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900 mb-1">{{ $course->mentor->user->name }}</h3>
            <p class="text-xs font-black text-[#FF7A00] uppercase tracking-[0.2em] mb-4">Instructor Expert</p>
            <p class="text-sm text-gray-500 leading-relaxed">
                Mentor berpengalaman yang akan membimbingmu secara bertahap hingga menguasai materi dengan standard industri saat ini.
            </p>
        </div>
    </div>
</section>
