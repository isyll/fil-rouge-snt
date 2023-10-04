<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FiliereRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: FiliereRepository::class)]
#[UniqueEntity('libelle', message: 'Le libellé existe déjà')]
#[ApiResource()]
class Filiere
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotNull(message: 'Le libellé est manquant')]
    private ?string $libelle = null;

    #[ORM\Column]
    #[Assert\NotNull(message: 'Le nombre de semestres est manquant')]
    private ?int $semestres = null;

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

    public function getSemestres(): ?int
    {
        return $this->semestres;
    }

    public function setSemestres(int $semestres): static
    {
        $this->semestres = $semestres;

        return $this;
    }
}
