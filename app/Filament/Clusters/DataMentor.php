<?php

namespace App\Filament\Clusters;

use Filament\Clusters\Cluster;

class DataMentor extends Cluster
{
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Data Mentor';

    protected static ?int $navigationSort = 3;
}
