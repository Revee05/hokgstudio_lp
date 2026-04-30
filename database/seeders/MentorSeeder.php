<?php

namespace Database\Seeders;

use App\Models\Mentor;
use App\Models\User;
use App\Enums\UserRole;
use App\Enums\Gender;
use App\Enums\MentorStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MentorSeeder extends Seeder
{
    public function run(): void
    {
        $mentors = [
            [
                'name' => 'Harsanto Anggriawan',
                'email' => 'harsanto@example.com',
                'city' => 'Semarang',
                'profession' => 'Seniman Visual',
                'bio' => 'Harsanto Anggriawan adalah seorang seniman sekaligus pengajar di salah satu kampus seni di Indonesia.',
                'experience' => '> 5 tahun mengajar',
                'certification' => 'diakui sertifikasi profesi oleh BPL tingkat nasional, dan memiliki 3 sertifikat penghargaan terkait bidang pendidikan dan kesenian',
                'specialties' => ['Visual Art', 'Teaching'],
            ],
            [
                'name' => 'Yuliana Lailasari',
                'email' => 'yuliana@example.com',
                'city' => 'Yogyakarta',
                'profession' => 'Seniman Visual',
                'bio' => 'Yuliana Lailasari adalah seniman visual yang mengeksplorasi bentuk, ruang, dan pengalaman sehari-hari melalui karya-karya yang reflektif dan penuh intuisi...',
                'experience' => '> 5 tahun mengajar',
                'certification' => 'diakui sertifikasi profesi oleh BPL tingkat nasional, dan memiliki 3 sertifikat penghargaan terkait bidang pendidikan dan kesenian',
                'specialties' => ['Conceptual Art', 'Illustration'],
            ],
        ];

        foreach ($mentors as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make('password'),
                    'role' => UserRole::MENTOR,
                ]
            );

            Mentor::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'name' => $data['name'],
                    'city' => $data['city'],
                    'profession' => $data['profession'],
                    'bio' => $data['bio'],
                    'experience' => $data['experience'],
                    'certification' => $data['certification'],
                    'specialties' => $data['specialties'],
                    'status' => MentorStatus::ACTIVE,
                ]
            );
        }
    }
}
