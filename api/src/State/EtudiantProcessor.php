<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Exception\PhoneNumberException;
use App\Repository\EtudiantRepository;
use App\Service\MatriculeGenerator;

class EtudiantProcessor implements ProcessorInterface
{
    public function __construct(private EtudiantRepository $etudiantRepository)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        $data->setTelephone(str_replace(' ', '', $data->getTelephone()));
        if (!preg_match('/^\d+$/', $data->getTelephone()))
            throw new PhoneNumberException('Le numéro de téléphone saisi est invalide');

        do {
            $matricule = MatriculeGenerator::generate();
        } while ($this->etudiantRepository->findOneByMatricule($matricule));

        $data->setMatricule($matricule);
        $this->etudiantRepository->save($data, true);
    }
}
