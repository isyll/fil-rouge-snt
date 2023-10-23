<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\SessionCoursValidationController;
use App\Repository\SessionCoursRepository;
use App\State\SessionCoursProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection,
        new Post(processor: SessionCoursProcessor::class),
        new Put(processor: SessionCoursProcessor::class),
        new Post(
            name: 'validation session',
            uriTemplate: '/session_cours/{id}/validation',
            controller: SessionCoursValidationController::class
        )
    ],
    normalizationContext: ['groups' => 'read']
)]
#[ORM\Entity(repositoryClass: SessionCoursRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['cours' => 'exact', 'salle' => 'exact', 'professeur' => 'exact'])]
class SessionCours
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'sessionCours')]
    #[Groups(['read'])]
    private ?Cours $cours = null;

    #[ORM\Column]
    #[Groups(['read'])]
    private ?string $heureDebut = null;

    #[ORM\Column]
    #[Groups(['read'])]
    private ?string $heureFin = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['read'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read'])]
    private ?string $duree = null;

    #[ORM\ManyToOne(inversedBy: 'sessionCours')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['read'])]
    private ?Salle $salle = null;

    #[ORM\ManyToOne(inversedBy: 'sessionCours')]
    #[Groups(['read'])]
    private ?Professeur $professeur = null;

    #[ORM\OneToMany(mappedBy: 'sessionCours', targetEntity: Presence::class)]
    private Collection $presences;

    #[ORM\Column]
    #[Groups(['read'])]
    private ?bool $presentiel = null;

    #[ORM\Column]
    #[Groups(['read'])]
    private ?bool $valide = null;

    public function __construct()
    {
        $this->presences = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getCours(): ?Cours
    {
        return $this->cours;
    }

    public function setCours(?Cours $cours): static
    {
        $this->cours = $cours;

        return $this;
    }

    public function getHeureDebut(): ?string
    {
        return $this->heureDebut;
    }

    public function setHeureDebut(string $heureDebut): static
    {
        $this->heureDebut = $heureDebut;

        return $this;
    }

    public function getHeureFin(): ?string
    {
        return $this->heureFin;
    }

    public function setHeureFin(string $heureFin): static
    {
        $this->heureFin = $heureFin;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getDuree(): ?string
    {
        return $this->duree;
    }

    public function setDuree(?string $duree): static
    {
        $this->duree = $duree;

        return $this;
    }

    public function getSalle(): ?Salle
    {
        return $this->salle;
    }

    public function setSalle(?Salle $salle): static
    {
        $this->salle = $salle;

        return $this;
    }

    public function getProfesseur(): ?Professeur
    {
        return $this->professeur;
    }

    public function setProfesseur(?Professeur $professeur): static
    {
        $this->professeur = $professeur;

        return $this;
    }

    /**
     * @return Collection<int, Presence>
     */
    public function getPresences(): Collection
    {
        return $this->presences;
    }

    public function addPresence(Presence $presence): static
    {
        if (!$this->presences->contains($presence)) {
            $this->presences->add($presence);
            $presence->setSessionCours($this);
        }

        return $this;
    }

    public function removePresence(Presence $presence): static
    {
        if ($this->presences->removeElement($presence)) {
            // set the owning side to null (unless already changed)
            if ($presence->getSessionCours() === $this) {
                $presence->setSessionCours(null);
            }
        }

        return $this;
    }

    public function isPresentiel(): ?bool
    {
        return $this->presentiel;
    }

    public function setPresentiel(bool $presentiel): static
    {
        $this->presentiel = $presentiel;

        return $this;
    }

    public function isValide(): ?bool
    {
        return $this->valide;
    }

    public function setValide(bool $valide): static
    {
        $this->valide = $valide;

        return $this;
    }
}
