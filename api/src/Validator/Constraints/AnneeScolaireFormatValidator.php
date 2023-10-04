<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

final class AnneeScolaireFormatValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (preg_match('/^\d{4}-\d{4}$/', $value)) {
            list($anneeDebut, $anneeFin) = explode('-', $value);

            if (($anneeFin - $anneeDebut) == 1)
                return;
        }

        $this->context->buildViolation($constraint->message)->addViolation();
    }
}