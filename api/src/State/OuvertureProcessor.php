<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Exception\OuvertureAlreadyDoneException;
use App\Repository\OuvertureRepository;

class OuvertureProcessor implements ProcessorInterface
{

    public function __construct(private OuvertureRepository $ouvertureRepository)
    {   }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        $existingOuverture = $this->ouvertureRepository->findOuverture($data);
        if (count($existingOuverture))
            throw new OuvertureAlreadyDoneException('La classe est déjà ouverte dans cette année.');

        $this->ouvertureRepository->save($data, true);
    }
}
