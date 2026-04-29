<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Models\Setting;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class SettingResource extends Resource
{
    protected static ?string $model = Setting::class;

    protected static ?string $cluster = \App\Filament\Clusters\Settings::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'Application Settings';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Forms\Components\TextInput::make('key')
                ->required()
                ->unique(ignoreRecord: true)
                ->maxLength(255),
            Forms\Components\TextInput::make('label')
                ->maxLength(255),
            Forms\Components\Select::make('type')
                ->options([
                    'text' => 'Text',
                    'textarea' => 'Textarea',
                    'number' => 'Number',
                    'boolean' => 'Boolean',
                ])
                ->required()
                ->default('text')
                ->live(),
            Forms\Components\Textarea::make('value')
                ->rows(3)
                ->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('label')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('key')
                ->searchable()
                ->sortable()
                ->copyable(),
            Tables\Columns\TextColumn::make('value')
                ->limit(50),
            Tables\Columns\TextColumn::make('type')
                ->badge(),
        ])
        ->filters([
            //
        ])
        ->actions([
            Actions\EditAction::make(),
            Actions\DeleteAction::make(),
        ])
        ->bulkActions([
            Actions\BulkActionGroup::make([
                Actions\DeleteBulkAction::make(),
            ]),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSettings::route('/'),
            'create' => Pages\CreateSetting::route('/create'),
            'edit' => Pages\EditSetting::route('/{record}/edit'),
        ];
    }
}
