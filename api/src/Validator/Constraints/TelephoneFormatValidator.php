<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

final class TelephoneFormatValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        $value = str_replace(' ', '', $value);

        if (preg_match('/^7[0-9]{8}$/', $value)) {
            return;
        }

        $this->context->buildViolation($constraint->message)->addViolation();
    }
}
