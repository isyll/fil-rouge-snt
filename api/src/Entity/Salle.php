<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\SalleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SalleRepository::class)]
#[UniqueEntity(['nom', 'numero'])]
#[ApiResource(
    operations: [new Post, new Get, new GetCollection],
    normalizationContext: ['groups' => 'read'],
    denormalizationContext: ['groups' => 'write'],
)]
#[ApiFilter(SearchFilter::class, properties: ['nom' => 'exact', 'numero' => 'exact'])]
class Salle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['write', 'read'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['write', 'read'])]
    private ?string $numero = null;

    #[ORM\Column]
    #[Groups(['write', 'read'])]
    private ?int $places = null;

    #[ORM\OneToMany(mappedBy: 'salle', targetEntity: SessionCours::class)]
    private Collection $sessionCours;

    public function __construct()
    {
        $this->sessionCours = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(string $numero): static
    {
        $this->numero = $numero;

        return $this;
    }

    public function getPlaces(): ?int
    {
        return $this->places;
    }

    public function setPlaces(int $places): static
    {
        $this->places = $places;

        return $this;
    }

    /**
     * @return Collection<int, SessionCours>
     */
    public function getSessionCours(): Collection
    {
        return $this->sessionCours;
    }

    public function addSessionCour(SessionCours $sessionCour): static
    {
        if (!$this->sessionCours->contains($sessionCour)) {
            $this->sessionCours->add($sessionCour);
            $sessionCour->setSalle($this);
        }

        return $this;
    }

    public function removeSessionCour(SessionCours $sessionCour): static
    {
        if ($this->sessionCours->removeElement($sessionCour)) {
            // set the owning side to null (unless already changed)
            if ($sessionCour->getSalle() === $this) {
                $sessionCour->setSalle(null);
            }
        }

        return $this;
    }
}