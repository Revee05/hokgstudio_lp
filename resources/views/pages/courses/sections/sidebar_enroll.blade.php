<div class="sticky top-32 space-y-6">
    <div class="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-orange-100/30 overflow-hidden">
        <div class="p-8">
            <div class="mb-6">
                <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Investasi Belajar</p>
                <h3 class="text-3xl font-black text-[#FF7A00]">
                    Rp {{ number_format($payable->price, 0, ',', '.') }}
                </h3>
            </div>

            <div class="space-y-4 mb-8">
                <div class="flex items-center gap-3 text-sm text-gray-600">
                    <i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i>
                    <span>Akses Selamanya</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-600">
                    <i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i>
                    <span>Sertifikat Kelulusan</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-600">
                    <i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i>
                    <span>Akses di Semua Perangkat</span>
                </div>
            </div>

            @php
                $isEnrolled = false;
                if(auth()->check()) {
                    if($type === 'course') {
                        $isEnrolled = auth()->user()->courses()->where('course_id', $payable->id)->exists();
                    } else {
                        $isEnrolled = auth()->user()->bundles()->where('course_bundle_id', $payable->id)->exists();
                    }
                }
            @endphp

            @if($isEnrolled)
                <a href="{{ $type === 'course' ? route('courses.learn', $payable) : route('courses.index') }}" 
                   class="w-full py-5 bg-green-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-200 hover:shadow-green-300 transform hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <i data-lucide="play-circle" class="w-6 h-6"></i>
                    Lanjut Belajar
                </a>
            @else
                <form action="{{ route('enroll.' . $type, $payable) }}" method="POST">
                    @csrf
                    <button type="submit" class="w-full py-5 bg-primary-gradient text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-1 transition-all active:scale-95">
                        Daftar Sekarang
                    </button>
                </form>
            @endif
            
            <p class="text-center mt-6 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Pembayaran Aman & Terverifikasi via Xendit
            </p>
        </div>
        
        <div class="bg-gray-50 p-6 flex justify-center gap-6 border-t border-gray-100">
             <i data-lucide="shield-check" class="w-6 h-6 text-gray-300"></i>
             <i data-lucide="credit-card" class="w-6 h-6 text-gray-300"></i>
             <i data-lucide="lock" class="w-6 h-6 text-gray-300"></i>
        </div>
    </div>

    <!-- Additional Info / Help -->
    <div class="bg-orange-50 rounded-3xl p-6 border border-orange-100/50">
        <h4 class="font-bold text-orange-900 text-sm mb-2 flex items-center gap-2">
            <i data-lucide="help-circle" class="w-4 h-4"></i>
            Butuh Bantuan?
        </h4>
        <p class="text-xs text-orange-700/70 leading-relaxed mb-4">
            Punya pertanyaan mengenai kelas ini sebelum mendaftar? Hubungi CS kami.
        </p>
        <button class="text-xs font-black text-[#FF7A00] uppercase tracking-wider hover:underline">
            Tanya Admin via WhatsApp
        </button>
    </div>
</div>
