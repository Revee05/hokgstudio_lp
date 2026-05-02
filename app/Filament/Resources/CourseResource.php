<?php

namespace App\Filament\Resources;

use App\Models\Course;
use App\Models\CourseCategory;
use Filament\Actions;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Forms;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Grid;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static ?string $cluster = \App\Filament\Clusters\Kelas::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationLabel = 'Daftar Kelas';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Course')
                    ->tabs([
                        Tab::make('Info Kelas')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Grid::make(3)->schema([
                                    Forms\Components\Select::make('type')
                                        ->label('Jenis Kelas')
                                        ->options([
                                            'product' => 'Product',
                                            'activity' => 'Activity',
                                        ])
                                        ->default('activity')
                                        ->required()
                                        ->live(),
                                    Forms\Components\Select::make('categories')
                                        ->label('Kategori')
                                        ->multiple()
                                        ->relationship('categories', 'name')
                                        ->searchable()
                                        ->preload()
                                        ->createOptionForm([
                                            Forms\Components\TextInput::make('name')
                                                ->label('Nama Kategori')
                                                ->required()
                                                ->unique('course_categories', 'name'),
                                        ]),
                                    Forms\Components\Select::make('mentor_id')
                                        ->label('Mentor')
                                        ->relationship('mentor', 'name')
                                        ->searchable()
                                        ->preload()
                                        ->required(),
                                ]),
                                Forms\Components\TextInput::make('title')
                                    ->label('Nama Kelas')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description')
                                    ->label('Deskripsi Kelas')
                                    ->rows(4),
                                Forms\Components\FileUpload::make('thumbnail')
                                    ->label('Poster / Thumbnail')
                                    ->image()
                                    ->imageEditor()
                                    ->disk('supabase')
                                    ->directory('courses/thumbnails'),
                            ]),

                        Tab::make('Harga & Status')
                            ->icon('heroicon-o-currency-dollar')
                            ->schema([
                                Grid::make(2)->schema([
                                    Forms\Components\TextInput::make('price')
                                        ->label('Harga (IDR)')
                                        ->numeric()
                                        ->prefix('Rp')
                                        ->default(0),
                                    Forms\Components\Select::make('status')
                                        ->label('Status')
                                        ->options([
                                            'draft' => 'Draft',
                                            'published' => 'Published',
                                        ])
                                        ->default('draft'),
                                ]),
                            ]),

                        Tab::make('Mode & Lokasi')
                            ->icon('heroicon-o-map-pin')
                            ->visible(fn (Get $get): bool => $get('type') === 'activity')
                            ->schema([
                                Forms\Components\Select::make('mode')
                                    ->label('Mode Pelaksanaan')
                                    ->options([
                                        'online' => 'Online',
                                        'offline' => 'Offline',
                                    ])
                                    ->default('offline')
                                    ->live(),
                                Forms\Components\TextInput::make('location')
                                    ->label('Tempat Pelaksanaan')
                                    ->visible(fn (Get $get): bool => $get('mode') === 'offline')
                                    ->maxLength(500),
                                Forms\Components\TextInput::make('meet_link')
                                    ->label('Link Meeting')
                                    ->visible(fn (Get $get): bool => $get('mode') === 'online')
                                    ->url()
                                    ->maxLength(500),
                            ]),

                        Tab::make('Jadwal')
                            ->icon('heroicon-o-calendar-days')
                            ->visible(fn (Get $get): bool => $get('type') === 'activity')
                            ->schema([
                                Grid::make(2)->schema([
                                    Forms\Components\DatePicker::make('start_date')
                                        ->label('Tanggal Mulai'),
                                    Forms\Components\DatePicker::make('end_date')
                                        ->label('Tanggal Selesai'),
                                    Forms\Components\TimePicker::make('start_time')
                                        ->label('Jam Mulai'),
                                    Forms\Components\TimePicker::make('end_time')
                                        ->label('Jam Selesai'),
                                ]),
                                Forms\Components\CheckboxList::make('days')
                                    ->label('Hari Pelaksanaan')
                                    ->options([
                                        'monday' => 'Senin',
                                        'tuesday' => 'Selasa',
                                        'wednesday' => 'Rabu',
                                        'thursday' => 'Kamis',
                                        'friday' => 'Jumat',
                                        'saturday' => 'Sabtu',
                                        'sunday' => 'Minggu',
                                    ])
                                    ->columns(4),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('thumbnail')
                    ->label('Poster')
                    ->disk('supabase')
                    ->circular(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Nama Kelas')
                    ->searchable()
                    ->sortable()
                    ->limit(40),
                Tables\Columns\TextColumn::make('categories.name')
                    ->label('Kategori')
                    ->badge()
                    ->color('gray'),
                Tables\Columns\TextColumn::make('bundles.title')
                    ->label('Paket')
                    ->badge()
                    ->color('warning')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('type')
                    ->label('Jenis')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'activity' => 'warning',
                        'product' => 'info',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('mentor.name')
                    ->label('Mentor')
                    ->searchable(),
                Tables\Columns\TextColumn::make('mode')
                    ->label('Mode')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'online' => 'info',
                        'offline' => 'warning',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('price')
                    ->label('Harga')
                    ->money('IDR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'draft' => 'gray',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('start_date')
                    ->label('Mulai')
                    ->date()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ]),
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'product' => 'Product',
                        'activity' => 'Activity',
                    ]),
                Tables\Filters\SelectFilter::make('mode')
                    ->options([
                        'online' => 'Online',
                        'offline' => 'Offline',
                    ]),
                Tables\Filters\SelectFilter::make('bundles')
                    ->label('Filter Berdasarkan Paket')
                    ->relationship('bundles', 'title')
                    ->searchable()
                    ->preload(),
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
            'index' => \App\Filament\Resources\CourseResource\Pages\ListCourses::route('/'),
            'create' => \App\Filament\Resources\CourseResource\Pages\CreateCourse::route('/create'),
            'edit' => \App\Filament\Resources\CourseResource\Pages\EditCourse::route('/{record}/edit'),
        ];
    }
}
