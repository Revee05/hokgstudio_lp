<?php

namespace App\Filament\Resources;

use App\Models\CourseBundle;
use App\Models\Mentor;
use Filament\Actions;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Grid;
use Filament\Forms;
use Filament\Forms\Set;

class CourseBundleResource extends Resource
{
    protected static ?string $model = CourseBundle::class;

    protected static ?string $cluster = \App\Filament\Clusters\Kelas::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?string $navigationLabel = 'Paket Kelas';

    protected static ?string $modelLabel = 'Paket Kelas';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Grid::make(2)->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Judul Paket')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                Forms\Components\Textarea::make('description')
                    ->label('Deskripsi Paket')
                    ->rows(4)
                    ->columnSpanFull(),

                Forms\Components\FileUpload::make('thumbnail')
                    ->label('Thumbnail Paket')
                    ->image()
                    ->imageEditor()
                    ->disk('supabase')
                    ->directory('bundles/thumbnails')
                    ->columnSpanFull(),

                Forms\Components\Select::make('mentor_id')
                    ->label('Mentor')
                    ->relationship('mentor', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),

                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'draft'    => 'Draft',
                        'pending'  => 'Menunggu Review',
                        'approved' => 'Disetujui',
                        'rejected' => 'Ditolak',
                    ])
                    ->default('draft')
                    ->required(),

                Forms\Components\TextInput::make('price')
                    ->label('Harga (IDR)')
                    ->numeric()
                    ->prefix('Rp')
                    ->placeholder('Set oleh Admin')
                    ->helperText('Hanya diisi oleh Admin saat menyetujui paket.')
                    ->columnSpanFull(),

                Forms\Components\Textarea::make('rejection_note')
                    ->label('Catatan Penolakan')
                    ->rows(3)
                    ->helperText('Isi jika paket ditolak, agar mentor dapat memperbaiki.')
                    ->columnSpanFull(),

                Forms\Components\Select::make('courses')
                    ->label('Kelas dalam Paket')
                    ->multiple()
                    ->relationship('courses', 'title')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->helperText('Pilih minimal 2 kelas.')
                    ->columnSpanFull(),

                Forms\Components\Select::make('categories')
                    ->label('Kategori Bundle')
                    ->multiple()
                    ->relationship('categories', 'name')
                    ->searchable()
                    ->preload()
                    ->createOptionForm([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, Forms\Set $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
                        Forms\Components\TextInput::make('slug')
                            ->required(),
                    ])
                    ->columnSpanFull(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('thumbnail')
                    ->label('Thumbnail')
                    ->disk('supabase')
                    ->circular(),

                Tables\Columns\TextColumn::make('title')
                    ->label('Judul Paket')
                    ->searchable()
                    ->sortable()
                    ->limit(40),

                Tables\Columns\TextColumn::make('mentor.name')
                    ->label('Mentor')
                    ->searchable(),

                Tables\Columns\TextColumn::make('courses_count')
                    ->label('Jml. Kelas')
                    ->counts('courses')
                    ->badge()
                    ->color('info'),

                Tables\Columns\TextColumn::make('price')
                    ->label('Harga')
                    ->money('IDR')
                    ->placeholder('Belum diatur')
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'approved' => 'success',
                        'pending'  => 'warning',
                        'rejected' => 'danger',
                        default    => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'draft'    => 'Draft',
                        'pending'  => 'Menunggu Review',
                        'approved' => 'Disetujui',
                        'rejected' => 'Ditolak',
                        default    => $state,
                    }),

                Tables\Columns\TextColumn::make('categories.name')
                    ->label('Kategori')
                    ->badge()
                    ->color('gray')
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->date()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Filter Status')
                    ->options([
                        'draft'    => 'Draft',
                        'pending'  => 'Menunggu Review',
                        'approved' => 'Disetujui',
                        'rejected' => 'Ditolak',
                    ]),

                Tables\Filters\SelectFilter::make('categories')
                    ->label('Filter Kategori')
                    ->relationship('categories', 'name')
                    ->searchable()
                    ->preload(),
            ])
            ->actions([
                // Quick approve action with price input
                Actions\Action::make('approve')
                    ->label('Setujui')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (CourseBundle $record): bool => $record->status === 'pending')
                    ->form([
                        Forms\Components\TextInput::make('price')
                            ->label('Harga Paket (IDR)')
                            ->numeric()
                            ->prefix('Rp')
                            ->required(),
                        Forms\Components\Toggle::make('publish_all_courses')
                            ->label('Publikasikan semua kelas dalam paket ini secara otomatis')
                            ->default(true),
                    ])
                    ->action(function (CourseBundle $record, array $data): void {
                        $record->update([
                            'status'         => 'approved',
                            'price'          => $data['price'],
                            'rejection_note' => null,
                        ]);

                        if ($data['publish_all_courses']) {
                            $record->courses()->update(['status' => 'published']);
                        }
                    })
                    ->successNotificationTitle('Paket berhasil disetujui!'),

                // Quick reject action with note
                Actions\Action::make('reject')
                    ->label('Tolak')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn (CourseBundle $record): bool => $record->status === 'pending')
                    ->form([
                        Forms\Components\Textarea::make('rejection_note')
                            ->label('Alasan Penolakan')
                            ->required()
                            ->rows(3),
                    ])
                    ->action(function (CourseBundle $record, array $data): void {
                        $record->update([
                            'status'         => 'rejected',
                            'rejection_note' => $data['rejection_note'],
                        ]);
                    })
                    ->successNotificationTitle('Paket ditolak.'),

                // New standalone button for bulk status update
                Actions\Action::make('publish_courses')
                    ->label('Publish Semua Kelas')
                    ->icon('heroicon-o-rocket-launch')
                    ->color('info')
                    ->requiresConfirmation()
                    ->visible(fn (CourseBundle $record): bool => $record->status === 'approved')
                    ->action(function (CourseBundle $record): void {
                        $record->courses()->update(['status' => 'published']);
                    })
                    ->successNotificationTitle('Semua kelas dalam paket telah dipublikasikan!'),

                Actions\EditAction::make()->label('Edit'),
                Actions\DeleteAction::make()->label('Hapus'),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index'  => \App\Filament\Resources\CourseBundleResource\Pages\ListCourseBundles::route('/'),
            'create' => \App\Filament\Resources\CourseBundleResource\Pages\CreateCourseBundle::route('/create'),
            'edit'   => \App\Filament\Resources\CourseBundleResource\Pages\EditCourseBundle::route('/{record}/edit'),
        ];
    }
}
