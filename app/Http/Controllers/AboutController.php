<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index()
    {
        $about = AboutUs::first();

        // Fallback data if table is empty
        if (!$about) {
            $about = (object) [
                'about_title' => 'Tentang Hokgstudio Academy',
                'about_description' => 'Hokgstudio Academy merupakan platform lelang karya seni bagi seniman pemula. Bagian unit usaha dari PT Rasa Kreasi Karya ini berfokus untuk mewadahi para penikmat seni untuk mengoleksi karya. Rasanya Lelang Karya menjadi wadah yang mempertemukan para pemula dengan para pecinta karya seni yang ingin menjadi kolektor muda.',
                'about_image' => null,
                'team_members' => [],
                'learning_steps' => [],
                'cta_title' => 'Butuh Respon Cepat',
                'cta_description' => 'Hubungi admin kami langsung melalui WhatsApp untuk pertanyaan mendesak atau pilih opsi kolaborasi jika ingin melakukan diskusi dan kerjasama dengan Hokgstudio Academy.',
                'cta_wa_link' => '#',
                'cta_form_link' => '#',
            ];
        }

        return view('pages.aboutUs.about', compact('about'));
    }
}
