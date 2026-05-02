<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::updateOrCreate(
            ['id' => 1],
            [
                'footer_description' => 'Platform belajar untuk mengembangkan skill digital bersama mentor berpengalaman dari industri kreatif dan teknologi.',
                'address' => 'Griya Bhayangkara Blok G-23, Kec. Masangan, Sidoarjo, JATIM, IND, 61258',
                'copyright_info' => '2023 - 2024 Hokgstudio Academy. All rights reserved.',
                'social_links' => [
                    ['platform' => 'Instagram', 'url' => 'https://instagram.com/hokgstudio'],
                    ['platform' => 'Facebook', 'url' => 'https://facebook.com/hokgstudio'],
                    ['platform' => 'Youtube', 'url' => 'https://youtube.com/hokgstudio'],
                    ['platform' => 'Tiktok', 'url' => 'https://tiktok.com/@hokgstudio'],
                ],
                'website_links' => [
                    ['label' => 'Portfolio', 'url' => 'https://hokgstudio.com/portfolio'],
                    ['label' => 'Blog', 'url' => 'https://hokgstudio.com/blog'],
                ],
                'favicon' => null,
                'logo_admin_light' => null,
                'logo_admin_dark' => null,
            ]
        );
    }
}
