<section>
    <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-black text-gray-900 flex items-center gap-3">
            <span class="w-2 h-8 bg-[#FF7A00] rounded-full"></span>
            Kelas dalam Paket Ini
        </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @foreach($bundle->courses as $item)
            <a href="{{ route('courses.show', $item->id) }}" class="group bg-white rounded-3xl border border-gray-100 p-4 flex gap-4 hover:border-[#FF7A00]/30 hover:shadow-xl hover:shadow-orange-100/20 transition-all">
                <div class="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src="{{ $item->thumbnail_url ?: asset('images/default_course.png') }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="flex flex-col justify-center min-w-0">
                    <span class="text-[9px] font-black text-[#FF7A00] uppercase tracking-widest mb-1">{{ $item->categories->first()->name ?? 'Skill' }}</span>
                    <h4 class="font-bold text-gray-900 group-hover:text-[#FF7A00] transition-colors truncate">{{ $item->title }}</h4>
                    <p class="text-[10px] text-gray-400 font-medium uppercase mt-1">{{ $item->type }} • {{ $item->modules->count() }} Modul</p>
                </div>
            </a>
        @endforeach
    </div>
</section>
