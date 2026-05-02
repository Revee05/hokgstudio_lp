<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Models\Setting;
use Filament\Actions;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Forms;
use Filament\Schemas\Components\Grid;

class SettingResource extends Resource
{
    protected static ?string $model = Setting::class;

    protected static ?string $cluster = \App\Filament\Clusters\Settings::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'Application Settings';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('Settings')
                ->tabs([
                    Tab::make('Branding')
                        ->icon('heroicon-o-photo')
                        ->schema([
                            Grid::make(2)->schema([
                                Forms\Components\FileUpload::make('logo_header')
                                    ->label('Logo Header (Frontend)')
                                    ->image()
                                    ->imageEditor()
                                    ->disk('supabase')
                                    ->directory('settings')
                                    ->columnSpan(2),
                                Forms\Components\FileUpload::make('logo_admin_light')
                                    ->label('Logo Admin (Light Mode)')
                                    ->image()
                                    ->imageEditor()
                                    ->disk('supabase')
                                    ->directory('settings'),
                                Forms\Components\FileUpload::make('logo_admin_dark')
                                    ->label('Logo Admin (Dark Mode)')
                                    ->image()
                                    ->imageEditor()
                                    ->disk('supabase')
                                    ->directory('settings'),
                                Forms\Components\FileUpload::make('favicon')
                                    ->label('Favicon (Website Icon)')
                                    ->image()
                                    ->imageEditor()
                                    ->disk('supabase')
                                    ->directory('settings'),
                            ]),
                        ]),
                    
                    Tab::make('Footer & Kontak')
                        ->icon('heroicon-o-envelope')
                        ->schema([
                            Forms\Components\Textarea::make('footer_description')
                                ->label('Deskripsi Footer')
                                ->rows(3),
                            Forms\Components\Textarea::make('address')
                                ->label('Alamat Kantor')
                                ->rows(3),
                            Forms\Components\TextInput::make('copyright_info')
                                ->label('Info Copyright')
                                ->placeholder('© 2026 Hokgstudio. All rights reserved.'),
                        ]),

                    Tab::make('Social & Website Links')
                        ->icon('heroicon-o-link')
                        ->schema([
                            Forms\Components\Repeater::make('social_links')
                                ->label('Ikuti Kami (Social Media)')
                                ->schema([
                                    Forms\Components\TextInput::make('platform')
                                        ->placeholder('Instagram, TikTok, dll')
                                        ->required(),
                                    Forms\Components\TextInput::make('url')
                                        ->label('Link URL')
                                        ->url()
                                        ->required(),
                                ])
                                ->columns(2)
                                ->collapsible()
                                ->itemLabel(fn (array $state): ?string => $state['platform'] ?? null),

                            Forms\Components\Repeater::make('website_links')
                                ->label('Website Kami (Link Tambahan)')
                                ->schema([
                                    Forms\Components\TextInput::make('label')
                                        ->placeholder('Contoh: Portfolio, Blog')
                                        ->required(),
                                    Forms\Components\TextInput::make('url')
                                        ->label('Link URL')
                                        ->url()
                                        ->required(),
                                ])
                                ->columns(2)
                                ->collapsible()
                                ->itemLabel(fn (array $state): ?string => $state['label'] ?? null),
                        ]),
                ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('logo_header')
                ->label('Logo')
                ->disk('supabase'),
            Tables\Columns\TextColumn::make('footer_description')
                ->label('Deskripsi Footer')
                ->limit(50),
            Tables\Columns\TextColumn::make('copyright_info')
                ->label('Copyright'),
            Tables\Columns\TextColumn::make('updated_at')
                ->dateTime()
                ->sortable(),
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
