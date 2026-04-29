<?php

namespace App\Filament\Resources;

use App\Models\Course;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Schemas\Schema;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static ?string $cluster = \App\Filament\Clusters\Kelas::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-document-text';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => \App\Filament\Resources\CourseResource\Pages\ListCourses::route('/'),
        ];
    }
}
