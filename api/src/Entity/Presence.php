<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\PresenceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PresenceRepository::class)]
#[ApiResource(
    operations: [new Post, new Put, new GetCollection],
    normalizationContext: ['groups' => ['read']]
)]
#[ApiFilter(SearchFilter::class, properties: ['sessionCours' => 'exact', 'etudiant' => 'exact'])]
class Presence
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'presences')]
    private ?SessionCours $sessionCours = null;

    #[ORM\ManyToOne(inversedBy: 'presences')]
    private ?Etudiant $etudiant = null;

    #[ORM\Column]
    #[Groups(['read'])]
    private ?bool $present = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSessionCours(): ?SessionCours
    {
        return $this->sessionCours;
    }

    public function setSessionCours(?SessionCours $sessionCours): static
    {
        $this->sessionCours = $sessionCours;

        return $this;
    }

    public function getEtudiant(): ?Etudiant
    {
        return $this->etudiant;
    }

    public function setEtudiant(?Etudiant $etudiant): static
    {
        $this->etudiant = $etudiant;

        return $this;
    }

    public function isPresent(): ?bool
    {
        return $this->present;
    }

    public function setPresent(bool $present): static
    {
        $this->present = $present;

        return $this;
    }
}