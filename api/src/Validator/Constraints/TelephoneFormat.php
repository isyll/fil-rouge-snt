<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class TelephoneFormat extends Constraint
{
    public $message = 'Le numéro de téléphone est invalide';
}
