<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use App\Exception\PhoneNumberException;
use App\Repository\EtudiantRepository;
use App\Repository\UserRepository;
use App\Service\MatriculeGenerator;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class EtudiantProcessor implements ProcessorInterface
{
    public function __construct(
        private EtudiantRepository $etudiantRepository,
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $userPasswordHasher
    ) {
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
        $user = new User;
        $user->setEmail($data->getEmail());
        $user->setPassword($this->userPasswordHasher->hashPassword($user, 'password'));
        $user->setRoles(['ROLE_ETUDIANT']);
        $this->userRepository->save($user);
        $this->etudiantRepository->save($data, true);
    }
}
