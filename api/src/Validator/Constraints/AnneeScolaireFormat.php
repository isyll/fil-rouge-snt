<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class AnneeScolaireFormat extends Constraint
{
    public $message = "L'année scolaire doît être de la forme 2020-2021";
}