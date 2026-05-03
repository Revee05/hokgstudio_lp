<section x-data="{ activeModule: null }">
    <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-black text-gray-900 flex items-center gap-3">
            <span class="w-2 h-8 bg-[#FF7A00] rounded-full"></span>
            Kurikulum Pembelajaran
        </h2>
        <span class="px-4 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">
            {{ $course->modules->count() }} Modul
        </span>
    </div>

    <div class="space-y-4">
        @forelse($course->modules as $module)
            <div class="bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button @click="activeModule = (activeModule === {{ $module->id }} ? null : {{ $module->id }})" 
                        class="w-full flex items-center justify-between p-6 text-left">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-orange-50 text-[#FF7A00] flex items-center justify-center font-black text-sm">
                            {{ $loop->iteration }}
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-900">{{ $module->title }}</h4>
                            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">{{ $module->lessons->count() }} Materi</p>
                        </div>
                    </div>
                    <i data-lucide="chevron-down" class="w-5 h-5 text-gray-400 transition-transform duration-300" :class="activeModule === {{ $module->id }} ? 'rotate-180' : ''"></i>
                </button>

                <div x-show="activeModule === {{ $module->id }}" 
                     x-transition:enter="transition ease-out duration-300"
                     x-transition:enter-start="opacity-0 max-h-0"
                     x-transition:enter-end="opacity-100 max-h-[1000px]"
                     class="border-t border-gray-50 bg-gray-50/30 p-6 pt-0">
                    <div class="space-y-3 pt-6">
                        @foreach($module->lessons as $lesson)
                            <div class="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-50 shadow-sm group hover:border-[#FF7A00]/30 transition-colors">
                                <div class="flex items-center gap-4">
                                    <div class="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 group-hover:text-[#FF7A00] transition-colors flex items-center justify-center">
                                        <i data-lucide="{{ $lesson->content_type === 'video' ? 'play-circle' : 'file-text' }}" class="w-4 h-4"></i>
                                    </div>
                                    <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">{{ $lesson->title }}</span>
                                </div>
                                <span class="text-[10px] font-black uppercase tracking-widest text-gray-300">{{ $lesson->content_type }}</span>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        @empty
            <div class="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
                <i data-lucide="layout-list" class="w-12 h-12 text-gray-200 mx-auto mb-4"></i>
                <p class="text-gray-400 font-medium">Kurikulum belum disusun oleh mentor.</p>
            </div>
        @endforelse
    </div>
</section>
