<?php

namespace App\Filament\Clusters;

use Filament\Clusters\Cluster;

class Kelas extends Cluster
{
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationLabel = 'Kelas';

    protected static ?int $navigationSort = 2;
}
