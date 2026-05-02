<?php

namespace App\Filament\Resources\CourseBundleResource\Pages;

use App\Filament\Resources\CourseBundleResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions;

class ListCourseBundles extends ListRecords
{
    protected static string $resource = CourseBundleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
