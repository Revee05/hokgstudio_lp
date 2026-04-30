<?php

namespace App\Filament\Clusters;

use Filament\Clusters\Cluster;

class Website extends Cluster
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-globe-alt';
    protected static ?string $navigationLabel = 'Manajemen Website';
    protected static ?string $cluster = null;
}
