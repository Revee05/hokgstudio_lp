<?php

namespace App\Filament\Resources;

use App\Enums\Gender;
use App\Enums\MentorStatus;
use App\Enums\UserRole;
use App\Filament\Resources\MentorResource\Pages;
use App\Models\Mentor;
use App\Models\User;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Schemas\Components\Section;
use Illuminate\Support\Facades\Hash;

class MentorResource extends Resource
{
    protected static ?string $model = Mentor::class;

    protected static ?string $cluster = \App\Filament\Clusters\DataMentor::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationLabel = 'Daftar Mentor';

    protected static ?string $modelLabel = 'Mentor';

    protected static ?string $pluralModelLabel = 'Mentor';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Akun Mentor')
                    ->description('Informasi akun login mentor. Email dan password digunakan untuk login ke platform.')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('Pilih User yang Sudah Ada')
                            ->relationship('user', 'name', fn($query) => $query->where('role', UserRole::MENTOR))
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->label('Nama')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('email')
                                    ->label('Email')
                                    ->email()
                                    ->required()
                                    ->unique('users', 'email')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('password')
                                    ->label('Password')
                                    ->password()
                                    ->required()
                                    ->minLength(8)
                                    ->dehydrateStateUsing(fn($state) => Hash::make($state)),
                            ])
                            ->createOptionUsing(function (array $data): int {
                                $data['role'] = UserRole::MENTOR;
                                return User::create($data)->id;
                            })
                            ->unique(ignoreRecord: true)
                            ->required()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Data Pribadi')
                    ->description('Informasi detail profil mentor.')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Lengkap')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('contact')
                            ->label('No. Telepon / WhatsApp')
                            ->tel()
                            ->maxLength(20),
                        Forms\Components\Select::make('gender')
                            ->label('Jenis Kelamin')
                            ->options(Gender::class)
                            ->required(),
                        Forms\Components\DatePicker::make('birthdate')
                            ->label('Tanggal Lahir')
                            ->native(false)
                            ->displayFormat('d M Y'),
                        Forms\Components\TextInput::make('profession')
                            ->label('Profesi')
                            ->maxLength(255)
                            ->placeholder('Contoh: UI/UX Designer, Software Engineer'),
                        Forms\Components\TextInput::make('city')
                            ->label('Kota')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('address')
                            ->label('Alamat')
                            ->rows(3)
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('bio')
                            ->label('Bio / Deskripsi Ringkas')
                            ->rows(3)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('experience')
                            ->label('Pengalaman')
                            ->placeholder('Contoh: > 5 tahun mengajar')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('certification')
                            ->label('Sertifikasi')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Keahlian & Status')
                    ->schema([
                        Forms\Components\TagsInput::make('specialties')
                            ->label('Specialty')
                            ->placeholder('Tambah specialty...')
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->label('Status')
                            ->options(MentorStatus::class)
                            ->default(MentorStatus::ACTIVE)
                            ->required(),
                    ])
                    ->columns(2),

                Section::make('Dokumen & Foto')
                    ->description('Upload foto profil dan CV. File disimpan ke Supabase Object Storage.')
                    ->schema([
                        Forms\Components\FileUpload::make('avatar')
                            ->label('Foto Profil')
                            ->image()
                            ->imageEditor()
                            ->disk('supabase')
                            ->directory('mentors/avatars')
                            ->maxSize(2048)
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
                        Forms\Components\FileUpload::make('cv')
                            ->label('CV (PDF)')
                            ->disk('supabase')
                            ->directory('mentors/cv')
                            ->maxSize(5120)
                            ->acceptedFileTypes(['application/pdf']),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('avatar')
                    ->label('')
                    ->circular()
                    ->disk('supabase')
                    ->defaultImageUrl(fn($record): string => 'https://ui-avatars.com/api/?name=' . urlencode($record->name ?? 'M') . '&color=7F9CF5&background=EBF4FF')
                    ->imageSize(40),
                Tables\Columns\TextColumn::make('name')
                    ->label('Mentor')
                    ->description(fn($record): ?string => ($record->city ? $record->city . ' | ' : '') . $record->user?->email)
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('specialties')
                    ->label('Specialty')
                    ->badge()
                    ->color('warning')
                    ->separator(','),
                Tables\Columns\TextColumn::make('courses_count')
                    ->label('Total Courses')
                    ->counts('courses')
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('students_count')
                    ->label('Total Students')
                    ->getStateUsing(function ($record): int {
                        return $record->courses()
                            ->withCount('students')
                            ->get()
                            ->sum('students_count');
                    })
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(MentorStatus::class),
            ])
            ->actions([
                Actions\EditAction::make()
                    ->iconButton(),
                Actions\DeleteAction::make()
                    ->iconButton(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMentors::route('/'),
            'create' => Pages\CreateMentor::route('/create'),
            'edit' => Pages\EditMentor::route('/{record}/edit'),
        ];
    }
}
