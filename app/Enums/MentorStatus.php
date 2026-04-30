<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;
use Filament\Support\Contracts\HasIcon;

enum MentorStatus: string implements HasLabel, HasColor, HasIcon
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';

    public function getLabel(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::INACTIVE => 'Inactive',
        };
    }

    public function getColor(): string | array | null
    {
        return match ($this) {
            self::ACTIVE => 'success',
            self::INACTIVE => 'danger',
        };
    }

    public function getIcon(): ?string
    {
        return match ($this) {
            self::ACTIVE => 'heroicon-m-check-circle',
            self::INACTIVE => 'heroicon-m-x-circle',
        };
    }
}
