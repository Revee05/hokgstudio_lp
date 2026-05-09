@extends('layout.app')

@section('content')
    <div class="bg-[#FCFCFC] pt-32 pb-24 min-h-screen">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h1 class="text-3xl font-black text-gray-900 mb-4">Konfirmasi Pembayaran</h1>
                <p class="text-gray-500">Satu langkah lagi untuk memulai perjalanan belajar Anda.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Order Summary -->
                <div class="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
                    <h3 class="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Ringkasan Pesanan</h3>
                    
                    <div class="flex gap-4 mb-8">
                        <div class="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                            <img src="{{ $payable->thumbnail_url ?: asset('images/default_course.png') }}" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <span class="text-[10px] font-black text-[#FF7A00] uppercase tracking-wider">{{ $type }}</span>
                            <h4 class="font-bold text-gray-900 leading-tight">{{ $payable->title }}</h4>
                            <p class="text-xs text-gray-400 mt-1">Akses Selamanya • Sertifikat Digital</p>
                        </div>
                    </div>

                    <div class="space-y-4 pt-6 border-t border-gray-50">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 font-medium">Harga Asli</span>
                            <span class="text-gray-900 font-bold">Rp {{ number_format($payable->price, 0, ',', '.') }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 font-medium">Biaya Layanan</span>
                            <span class="text-green-500 font-bold">Gratis</span>
                        </div>
                        <div class="flex justify-between pt-4 border-t border-gray-100">
                            <span class="text-lg font-black text-gray-900">Total Bayar</span>
                            <span class="text-2xl font-black text-[#FF7A00]">Rp {{ number_format($payable->price, 0, ',', '.') }}</span>
                        </div>
                    </div>
                </div>

                <!-- Payment Instructions -->
                <div class="flex flex-col justify-center space-y-6">
                    <div class="bg-orange-50 rounded-3xl p-6 border border-orange-100/50">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF7A00] shadow-sm flex-shrink-0">
                                <i data-lucide="shield-check" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-orange-900 text-sm mb-1">Pembayaran Aman</h4>
                                <p class="text-xs text-orange-700/70 leading-relaxed">
                                    Transaksi Anda diproses secara aman melalui Xendit Payment Gateway. Kami tidak menyimpan informasi kartu atau bank Anda.
                                </p>
                            </div>
                        </div>
                    </div>

                    <a href="{{ $transaction->checkout_url }}" 
                       class="w-full py-5 bg-primary-gradient text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3">
                        Lanjut ke Pembayaran
                        <i data-lucide="arrow-right" class="w-6 h-6"></i>
                    </a>

                    <p class="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Metode: Virtual Account, E-Wallet, QRIS, & Retail Outlet
                    </p>
                </div>
            </div>
        </div>
    </div>
@endsection
