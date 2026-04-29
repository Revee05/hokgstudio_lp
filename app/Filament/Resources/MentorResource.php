<?php

namespace App\Filament\Resources;

use App\Models\Mentor;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Schemas\Schema;

class MentorResource extends Resource
{
    protected static ?string $model = Mentor::class;

    protected static ?string $cluster = \App\Filament\Clusters\DataMentor::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-briefcase';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => \App\Filament\Resources\MentorResource\Pages\ListMentors::route('/'),
        ];
    }
}
