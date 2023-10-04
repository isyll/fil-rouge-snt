<?php

namespace App\Entity;

use App\Repository\InscriptionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InscriptionRepository::class)]
class Inscription
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(name: 'classe_id', nullable: false)]
    private ?Classe $classe = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(name: 'etudiant_id', nullable: false)]
    private ?Etudiant $etudiant = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(name: 'annee_scolaire_id', nullable: false)]
    private ?AnneeScolaire $annee_scolaire = null;

    public function getId(): ?int
    {
        return $this->id;
    }
}
