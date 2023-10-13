<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Exception\ExistingInscriptionException;
use App\Exception\PhoneNumberException;
use App\Repository\InscriptionRepository;

class InscriptionProcessor implements ProcessorInterface
{
    public function __construct(private InscriptionRepository $inscriptionRepository)
    {    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        $existingInscriptions = $this->inscriptionRepository->findInscription($data);
        if (count($existingInscriptions))
            throw new ExistingInscriptionException("L'élève est déjà inscrit dans cette classe pour cette année.");
        if (!preg_match('/^\d+$/', $data->getTelephone()))
            throw new PhoneNumberException('Le numéro de téléphone saisi est invalide');

        $data->setTelephone(str_replace(' ', '', $data->getTelephone()));
        $this->inscriptionRepository->save($data, true);
    }
}
