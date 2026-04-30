<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;
use Filament\Support\Contracts\HasIcon;

enum Gender: string implements HasLabel, HasColor, HasIcon
{
    case MALE = 'male';
    case FEMALE = 'female';

    public function getLabel(): string
    {
        return match ($this) {
            self::MALE => 'Laki-laki',
            self::FEMALE => 'Perempuan',
        };
    }

    public function getColor(): string | array | null
    {
        return match ($this) {
            self::MALE => 'info',
            self::FEMALE => 'danger',
        };
    }

    public function getIcon(): ?string
    {
        return match ($this) {
            self::MALE => 'heroicon-m-user',
            self::FEMALE => 'heroicon-m-user',
        };
    }
}
