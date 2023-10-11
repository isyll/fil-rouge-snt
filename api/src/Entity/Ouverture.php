<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Repository\OuvertureRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OuvertureRepository::class)]
#[ApiResource(operations: [
    new Post(normalizationContext: ['groups' => 'write']),
    new Get(normalizationContext: ['groups' => 'read'])
])]
#[ApiFilter(SearchFilter::class, properties: ['annee_scolaire' => 'exact'])]
class Ouverture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'ouvertures')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['write', 'read'])]
    private ?Classe $classe = null;

    #[ORM\ManyToOne(inversedBy: 'ouvertures')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['write', 'read'])]
    private ?AnneeScolaire $annee_scolaire = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClasse(): ?Classe
    {
        return $this->classe;
    }

    public function setClasse(?Classe $classe): static
    {
        $this->classe = $classe;

        return $this;
    }

    public function getAnneeScolaire(): ?AnneeScolaire
    {
        return $this->annee_scolaire;
    }

    public function setAnneeScolaire(?AnneeScolaire $annee_scolaire): static
    {
        $this->annee_scolaire = $annee_scolaire;

        return $this;
    }
}
