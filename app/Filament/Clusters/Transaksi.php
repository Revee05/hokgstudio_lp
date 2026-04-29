<?php

namespace App\Filament\Clusters;

use Filament\Clusters\Cluster;

class Transaksi extends Cluster
{
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationLabel = 'Transaksi';

    protected static ?int $navigationSort = 4;
}
