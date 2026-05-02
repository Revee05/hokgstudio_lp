<?php

namespace App\Filament\Resources;

use App\Models\BundleCategory;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Actions;
use Filament\Forms;
use Filament\Forms\Set;
use Illuminate\Support\Str;

class BundleCategoryResource extends Resource
{
    protected static ?string $model = BundleCategory::class;

    protected static ?string $cluster = \App\Filament\Clusters\Kelas::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-tag';

    protected static ?string $navigationLabel = 'Kategori Paket';

    protected static ?string $modelLabel = 'Kategori Paket';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Forms\Components\TextInput::make('name')
                ->label('Nama Kategori')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => 
                    $operation === 'create' ? $set('slug', Str::slug($state)) : null
                ),

            Forms\Components\TextInput::make('slug')
                ->label('Slug')
                ->required()
                ->unique(BundleCategory::class, 'slug', ignoreRecord: true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Kategori')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('slug')
                    ->label('Slug')
                    ->copyable(),

                Tables\Columns\TextColumn::make('bundles_count')
                    ->label('Jml. Paket')
                    ->counts('bundles')
                    ->badge()
                    ->color('success'),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => \App\Filament\Resources\BundleCategoryResource\Pages\ListBundleCategories::route('/'),
        ];
    }
}
