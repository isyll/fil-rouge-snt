<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Exception\SessionCoursTimeException;
use App\Repository\SessionCoursRepository;

class SessionCoursProcessor implements ProcessorInterface
{
    public function __construct(private SessionCoursRepository $sessionCoursRepository)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        if (!$this->validateTime($data->getHeureDebut()))
            throw new SessionCoursTimeException("L'heure de début est invalide");
        if (!$this->validateTime($data->getHeureFin()))
            throw new SessionCoursTimeException("L'heure de fin est invalide");
        if (!$this->validateTime($data->getDuree()))
            throw new SessionCoursTimeException("La durée est invalide");

        $this->sessionCoursRepository->save($data, true);
    }

    private function validateTime(string $time): bool
    {
        try {
            if (count($data = explode(':', $time)) === 2) {
                if (!is_numeric($data[0]) || !is_numeric($data[1]))
                    return false;

                $hours   = (int) $data[0];
                $minutes = (int) $data[1];

                if ($hours >= 24 || $hours < 0 || $minutes >= 60 || $minutes < 0)
                    return false;

                return true;
            }

            return false;
        }
        catch (\ValueError $e) {
            return false;
        }
    }
}
