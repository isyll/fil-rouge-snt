<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CoursRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CoursRepository::class)]
#[ApiResource(
    operations: [new Get, new GetCollection, new Put, new Post],
    normalizationContext: ['groups' => ['read']]
)]
#[ApiFilter(SearchFilter::class, properties: ['module' => 'exact', 'annee_scolaire' => 'exact', 'semestre' => 'exact'])]
#[UniqueConstraint(fields: ['module', 'annee_scolaire', 'semestre', 'classe'])]
#[UniqueEntity(['module', 'annee_scolaire', 'semestre'], message: 'Ce cours est déjà planifié dans pour ce semestre pour cette année')]
class Cours
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['write', 'read'])]
    private ?int $heures = null;

    #[ORM\Column]
    #[Groups(['write', 'read'])]
    private ?int $semestre = null;

    #[ORM\ManyToOne(inversedBy: 'cours')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read'])]
    private ?Module $module = null;

    #[ORM\ManyToOne(inversedBy: 'cours')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read'])]
    private ?AnneeScolaire $annee_scolaire = null;

    #[ORM\ManyToOne(inversedBy: 'cours')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read'])]
    private ?Classe $classe = null;

    #[ORM\OneToMany(mappedBy: 'cours', targetEntity: SessionCours::class)]
    private Collection $sessionCours;

    public function __construct()
    {
        $this->sessionCours = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHeures(): ?int
    {
        return $this->heures;
    }

    public function setHeures(int $heures): static
    {
        $this->heures = $heures;

        return $this;
    }

    public function getSemestre(): ?int
    {
        return $this->semestre;
    }

    public function setSemestre(int $semestre): static
    {
        $this->semestre = $semestre;

        return $this;
    }

    public function getModule(): ?Module
    {
        return $this->module;
    }

    public function setModule(?Module $module): static
    {
        $this->module = $module;

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

    public function getClasse(): ?Classe
    {
        return $this->classe;
    }

    public function setClasse(?Classe $classe): static
    {
        $this->classe = $classe;

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
            $sessionCour->setCours($this);
        }

        return $this;
    }

    public function removeSessionCour(SessionCours $sessionCour): static
    {
        if ($this->sessionCours->removeElement($sessionCour)) {
            // set the owning side to null (unless already changed)
            if ($sessionCour->getCours() === $this) {
                $sessionCour->setCours(null);
            }
        }

        return $this;
    }
}
