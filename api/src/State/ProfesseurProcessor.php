<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Professeur;
use App\Entity\User;
use App\Repository\ProfesseurRepository;
use App\Repository\UserRepository;
use App\Service\MatriculeGenerator;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ProfesseurProcessor implements ProcessorInterface
{
    public function __construct(
        private ProfesseurRepository $professeurRepository,
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $userPasswordHasher
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        do {
            $matricule = MatriculeGenerator::generate();
        } while ($this->professeurRepository->findOneByMatricule($matricule));

        $data->setMatricule($matricule);
        $user = new User;
        $user->setEmail($data->getEmail());
        $user->setPassword($this->userPasswordHasher->hashPassword($user, 'password'));
        $user->setRoles(['ROLE_PROF']);
        $this->userRepository->save($user);
        $this->professeurRepository->save($data, true);
    }
}
