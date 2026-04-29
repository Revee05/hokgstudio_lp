<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hokgstudio Academy - Belajar Skill Digital dari Nol</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .text-gradient {
            background: linear-gradient(90deg, #FF7A00 0%, #FFB800 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .bg-primary-gradient {
            background: linear-gradient(90deg, #FF7A00 0%, #FFB800 100%);
        }
    </style>
</head>
<body class="antialiased bg-[#FCFCFC] text-[#1A1A1A]">
    @include('layout.header')

    <main>
        @yield('content')
    </main>

    @include('layout.footer')

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
      lucide.createIcons();
    </script>
</body>
</html>
