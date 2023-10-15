<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->userPasswordHasher = $userPasswordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Création d'un professeur
        $prof = new User();
        $prof->setEmail("user@sa.sn");
        $prof->setRoles(["ROLE_PROF"]);
        $prof->setPassword($this->userPasswordHasher->hashPassword($prof, "password"));
        $manager->persist($prof);

        // Création d'un RP
        $rp = new User();
        $rp->setEmail("admin@sa.sn");
        $rp->setRoles(["ROLE_RP"]);
        $rp->setPassword($this->userPasswordHasher->hashPassword($rp, "password"));
        $manager->persist($rp);

        // Création d'un Attaché
        $attache = new User();
        $attache->setEmail("attaché@sa.sn");
        $attache->setRoles(["ROLE_ATTACHE"]);
        $attache->setPassword($this->userPasswordHasher->hashPassword($attache, "password"));
        $manager->persist($attache);

        $manager->flush();
   }
}
