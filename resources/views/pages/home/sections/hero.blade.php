<section class="relative pt-16 pb-20 overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute top-0 right-0 -z-10 w-1/2 h-full bg-orange-50/50 rounded-l-[100px] transform translate-x-20">
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-12">
            <!-- Content -->
            <div class="flex-1 space-y-8 text-center lg:text-left">
                <div
                    class="inline-flex items-center gap-2 bg-orange-50 text-[#FF7A00] px-4 py-2 rounded-full font-bold text-sm">
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                    Investasi Terbaik adalah Investasi Ilmu
                </div>

                <h1 class="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1]">
                    Belajar Skill Digital dari Nol sampai <span class="text-gradient">Siap Kerja</span>
                </h1>

                <p class="text-gray-500 text-lg lg:text-xl max-w-2xl leading-relaxed">
                    Kuasai keahlian teknologi paling dicari di industri saat ini melalui kurikulum berbasis proyek yang
                    dipandu langsung oleh praktisi profesional.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a href="#"
                        class="bg-primary-gradient text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-1">
                        Mulai Belajar
                    </a>
                    <a href="#"
                        class="bg-white text-[#FF7A00] border-2 border-orange-100 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all">
                        Lihat Course
                    </a>
                </div>

                <div class="flex items-center gap-6 justify-center lg:justify-start pt-4">
                    <div class="flex -space-x-3">
                        <div class="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=1" alt="Student">
                        </div>
                        <div class="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=2" alt="Student">
                        </div>
                        <div class="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=3" alt="Student">
                        </div>
                        <div
                            class="w-12 h-12 rounded-full border-4 border-white bg-[#FF7A00] flex items-center justify-center text-white font-bold text-xs">
                            10k+
                        </div>
                    </div>
                    <div>
                        <p class="font-bold text-gray-900">10,000+ Alumni</p>
                        <p class="text-gray-500 text-sm">Telah bergabung & sukses</p>
                    </div>
                </div>
            </div>

            <!-- Image -->
            <div class="flex-1 relative">
                <div class="relative z-10 animate-float">
                    <img src="{{ asset('images/hero_student_laptop.png') }}" alt="Hokgstudio Hero"
                        class="w-full max-w-[600px] mx-auto drop-shadow-2xl">
                </div>

                <!-- Floating Card -->
                <div
                    class="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl z-20 flex items-center gap-4 animate-bounce-slow">
                    <div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <i data-lucide="check-circle-2" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-900 leading-tight">Curriculum Update</p>
                        <p class="text-gray-500 text-xs uppercase font-semibold">April 2024</p>
                    </div>
                </div>

                <!-- Decorative elements -->
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
                <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            </div>
        </div>
    </div>
</section>

<style>
    @keyframes float {
        0% {
            transform: translateY(0px);
        }

        50% {
            transform: translateY(-20px);
        }

        100% {
            transform: translateY(0px);
        }
    }

    .animate-float {
        animation: float 6s ease-in-out infinite;
    }

    @keyframes bounce-slow {

        0%,
        100% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-10px);
        }
    }

    .animate-bounce-slow {
        animation: bounce-slow 4s ease-in-out infinite;
    }
</style>