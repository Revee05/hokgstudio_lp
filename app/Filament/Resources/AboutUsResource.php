<?php

namespace App\Filament\Resources;

use App\Filament\Clusters\Website;
use App\Filament\Resources\AboutUsResource\Pages;
use App\Models\AboutUs;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

class AboutUsResource extends Resource
{
    protected static ?string $model = AboutUs::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-information-circle';

    protected static ?string $cluster = Website::class;

    protected static ?string $navigationLabel = 'Tentang Kami';

    protected static ?string $pluralModelLabel = 'Tentang Kami';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('Tabs')
                ->tabs([
                    Tab::make('Section 1: Tentang')
                        ->schema([
                            Forms\Components\TextInput::make('about_title')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\Textarea::make('about_description')
                                ->required()
                                ->rows(5)
                                ->columnSpanFull(),
                            Forms\Components\FileUpload::make('about_image')
                                ->image()
                                ->imageEditor()
                                ->disk('supabase')
                                ->directory('about')
                                ->maxSize(2048)
                                ->helperText('Format: JPG, PNG, WEBP. Maks 2MB.')
                                ->columnSpanFull(),
                        ]),
                    Tab::make('Section 2: Tim')
                        ->schema([
                            Forms\Components\Repeater::make('team_members')
                                ->schema([
                                    Forms\Components\TextInput::make('name')
                                        ->required(),
                                    Forms\Components\TextInput::make('role')
                                        ->required(),
                                    Forms\Components\FileUpload::make('photo')
                                        ->image()
                                        ->imageEditor()
                                        ->disk('supabase')
                                        ->directory('team'),
                                    Forms\Components\TextInput::make('instagram_url')
                                        ->url(),
                                    Forms\Components\TextInput::make('email')
                                        ->email(),
                                ])
                                ->columns(2)
                                ->collapsible()
                                ->reorderable()
                                ->itemLabel(fn (array $state): ?string => $state['name'] ?? null),
                        ]),
                    Tab::make('Section 3: Langkah Belajar')
                        ->schema([
                            Forms\Components\Repeater::make('learning_steps')
                                ->schema([
                                    Forms\Components\TextInput::make('title')
                                        ->required(),
                                    Forms\Components\Textarea::make('description')
                                        ->required(),
                                    Forms\Components\TextInput::make('icon')
                                        ->helperText('Gunakan nama icon Lucide (contoh: book, play, message-square, briefcase)'),
                                ])
                                ->columns(1)
                                ->collapsible()
                                ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
                        ]),
                    Tab::make('Section 4: CTA')
                        ->schema([
                            Forms\Components\TextInput::make('cta_title')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\Textarea::make('cta_description')
                                ->required()
                                ->rows(3)
                                ->columnSpanFull(),
                            Forms\Components\TextInput::make('cta_wa_link')
                                ->required()
                                ->url(),
                            Forms\Components\TextInput::make('cta_form_link')
                                ->required()
                                ->url(),
                        ]),
                ])
                ->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('about_title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Actions\EditAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAboutUs::route('/'),
            'create' => Pages\CreateAboutUs::route('/create'),
            'edit' => Pages\EditAboutUs::route('/{record}/edit'),
        ];
    }
}
