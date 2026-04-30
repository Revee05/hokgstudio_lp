<?php

namespace App\Enums;
 
use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum UserRole: string implements HasLabel, HasColor
{
    case USER = 'user';
    case ADMIN = 'admin';
    case MENTOR = 'mentor';
    case MEMBER = 'member';

    public function getLabel(): string
    {
        return match ($this) {
            self::USER => 'User',
            self::ADMIN => 'Admin',
            self::MENTOR => 'Mentor',
            self::MEMBER => 'Member',
        };
    }

    public function getColor(): string | array | null
    {
        return match ($this) {
            self::USER => 'gray',
            self::ADMIN => 'danger',
            self::MENTOR => 'warning',
            self::MEMBER => 'success',
        };
    }

    public function getFrontendLabel(): string
    {
        return match ($this) {
            self::USER => 'User',
            self::ADMIN => 'Admin',
            self::MENTOR => 'Instructor',
            self::MEMBER => 'Student',
        };
    }
}
