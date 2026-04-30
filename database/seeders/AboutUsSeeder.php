<?php

namespace Database\Seeders;

use App\Models\AboutUs;
use Illuminate\Database\Seeder;

class AboutUsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AboutUs::create([
            'about_title' => 'Tentang Hokgstudio Academy',
            'about_description' => "Hokgstudio Academy merupakan platform lelang karya seni bagi seniman pemula. Bagian unit usaha dari PT Rasa Kreasi Karya ini berfokus untuk mewadahi para penikmat seni untuk mengoleksi karya. Rasanya Lelang Karya menjadi wadah yang mempertemukan para pemula dengan para pecinta karya seni yang ingin menjadi kolektor muda.\n\nDi samping menyelenggarakan pelatihan offline, unit ini turut memperkenalkan beragam produk merchandise sebagai bentuk dukungan terhadap pertumbuhan kreativitas baru sekaligus membuka ruang bagi publik untuk membawa pulang karya seni dalam bentuk yang lebih personal.",
            'about_image' => null,
            'team_members' => [
                [
                    'name' => 'Amanda Rizqyana',
                    'role' => 'Founder',
                    'photo' => null,
                    'instagram_url' => 'https://instagram.com',
                    'email' => 'amanda@hokgstudio.com'
                ],
                [
                    'name' => 'Arief Hadinata',
                    'role' => 'Co-Founder',
                    'photo' => null,
                    'instagram_url' => 'https://instagram.com',
                    'email' => 'arief@hokgstudio.com'
                ],
                [
                    'name' => 'Bakhtiar Amrullah',
                    'role' => 'Co-Founder',
                    'photo' => null,
                    'instagram_url' => 'https://instagram.com',
                    'email' => 'bakhtiar@hokgstudio.com'
                ],
            ],
            'learning_steps' => [
                [
                    'title' => 'Pilih Kelas',
                    'description' => 'Pilih kelas yang sesuai dengan minat dan passion kamu.',
                    'icon' => 'book'
                ],
                [
                    'title' => 'Belajar & Praktik',
                    'description' => 'Akses materi video dan latihan kapan saja dan di mana saja.',
                    'icon' => 'play'
                ],
                [
                    'title' => 'Dapat Feedback',
                    'description' => 'Kiriman tugas dan dapatkan feedback langsung dari mentor ahli.',
                    'icon' => 'message-square'
                ],
                [
                    'title' => 'Bangun Portofolio',
                    'description' => 'Selesaikan project nyata dan siap untuk dunia kerja.',
                    'icon' => 'briefcase'
                ],
            ],
            'cta_title' => 'Butuh Respon Cepat',
            'cta_description' => 'Hubungi admin kami langsung melalui WhatsApp untuk pertanyaan mendesak atau pilih opsi kolaborasi jika ingin melakukan diskusi dan kerjasama dengan Hokgstudio Academy.',
            'cta_wa_link' => 'https://wa.me/1234567890',
            'cta_form_link' => 'https://forms.gle/example',
        ]);
    }
}
