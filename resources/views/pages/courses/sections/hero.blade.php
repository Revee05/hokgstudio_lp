<div class="relative rounded-[2rem] overflow-hidden bg-white shadow-2xl shadow-orange-100/20 border border-gray-100">
    <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10"></div>
    
    <div class="aspect-[21/9] w-full relative">
        <img src="{{ $course->thumbnail_url ?: asset('images/default_course.png') }}" 
             alt="{{ $course->title }}" 
             class="w-full h-full object-cover">
    </div>

    <div class="absolute inset-0 z-20 flex flex-col justify-center px-12 md:px-20 max-w-4xl">
        <div class="flex flex-wrap items-center gap-3 mb-6">
            @foreach($course->categories as $cat)
                <span class="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs font-bold uppercase tracking-wider">
                    {{ $cat->name }}
                </span>
            @endforeach
            <span class="px-4 py-1.5 bg-[#FF7A00] text-white rounded-full text-xs font-bold uppercase tracking-wider">
                {{ $course->type === 'product' ? 'Self-Paced' : ($course->mode === 'online' ? 'Online Class' : 'Offline Class') }}
            </span>
        </div>
        
        <h1 class="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            {{ $course->title }}
        </h1>

        <div class="flex items-center gap-6">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md p-0.5 border border-white/30 overflow-hidden">
                    @if($course->mentor->avatar_url)
                        <img src="{{ $course->mentor->avatar_url }}" class="w-full h-full object-cover">
                    @else
                        <div class="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                            {{ substr($course->mentor->user->name, 0, 1) }}
                        </div>
                    @endif
                </div>
                <div>
                    <p class="text-[10px] text-white/60 font-bold uppercase tracking-widest">Mentor Profesional</p>
                    <p class="text-sm text-white font-bold">{{ $course->mentor->user->name }}</p>
                </div>
            </div>
            
            <div class="h-10 w-px bg-white/20 hidden md:block"></div>

            <div class="hidden md:flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                    <i data-lucide="book-open" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="text-[10px] text-white/60 font-bold uppercase tracking-widest">Materi</p>
                    <p class="text-sm text-white font-bold">{{ $course->modules->sum(fn($m) => $m->lessons->count()) }} Pelajaran</p>
                </div>
            </div>
        </div>
    </div>
</div>
