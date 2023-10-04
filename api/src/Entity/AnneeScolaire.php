<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AnneeScolaireRepository;
use App\Validator\Constraints\AnneeScolaireFormat;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AnneeScolaireRepository::class)]
#[UniqueEntity('libelle', message: 'Le libellé est manquant')]
#[ApiResource()]
class AnneeScolaire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotNull(message: 'Le libellé est manquant')]
    #[AnneeScolaireFormat]
    private ?string $libelle = null;

    #[ORM\OneToMany(targetEntity: Inscription::class, mappedBy: 'annee_scolaire')]
    private Collection $classes;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): static
    {
        $this->libelle = $libelle;

        return $this;
    }
}
