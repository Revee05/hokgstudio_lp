<?php

namespace App\Filament\Resources\CourseBundleResource\Pages;

use App\Filament\Resources\CourseBundleResource;
use Filament\Resources\Pages\EditRecord;
use Filament\Actions;

class EditCourseBundle extends EditRecord
{
    protected static string $resource = CourseBundleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
