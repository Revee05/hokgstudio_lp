<?php

namespace App\Filament\Resources\BundleCategoryResource\Pages;

use App\Filament\Resources\BundleCategoryResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions;

class ListBundleCategories extends ListRecords
{
    protected static string $resource = BundleCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
