<?php

namespace App\Filament\Resources;

use App\Models\Transaction;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Schemas\Schema;

class TransactionResource extends Resource
{
    protected static ?string $model = Transaction::class;

    protected static ?string $cluster = \App\Filament\Clusters\Transaksi::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-shopping-bag';

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
            'index' => \App\Filament\Resources\TransactionResource\Pages\ListTransactions::route('/'),
        ];
    }
}
