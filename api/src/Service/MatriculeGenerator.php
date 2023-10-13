<?php

namespace App\Service;

class MatriculeGenerator
{
    const PATTERN = '###-###';

    public static function generate(): string
    {
        $matricule = '';
        for ($i = 0; $i < strlen(self::PATTERN); $i++) {
            if (($c = self::PATTERN[$i]) === '#')
                $c = rand(0, 9);
            $matricule .= $c;
        }
        return $matricule;
    }
}
