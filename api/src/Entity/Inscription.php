<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Repository\InscriptionRepository;
use App\State\InscriptionProcessor;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InscriptionRepository::class)]
#[ApiResource(operations: [new Post(processor: InscriptionProcessor::class), new Get])]
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
    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function setClasse(Classe $classe): static
    {
        $this->classe = $classe;

        return $this;
    }

    public function setEtudiant(Etudiant $etudiant): static
    {
        $this->etudiant = $etudiant;

        return $this;
    }

    public function setAnneeScolaire(AnneeScolaire $annee_scolaire): static
    {
        $this->annee_scolaire = $annee_scolaire;

        return $this;
    }

    public function getClasse(): Classe
    {
        return $this->classe;
    }

    public function getEtudiant(): Etudiant
    {
        return $this->etudiant;
    }

    public function getAnneeScolaire(): AnneeScolaire
    {
        return $this->annee_scolaire;
    }
}
