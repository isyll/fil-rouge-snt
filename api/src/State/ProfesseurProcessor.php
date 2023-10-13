<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Repository\ProfesseurRepository;
use App\Service\MatriculeGenerator;

class ProfesseurProcessor implements ProcessorInterface
{
    public function __construct(private ProfesseurRepository $professeurRepository)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        do {
            $matricule = MatriculeGenerator::generate();
        } while ($this->professeurRepository->findOneByMatricule($matricule));

        $data->setMatricule($matricule);
        $this->professeurRepository->save($data, true);
    }
}
