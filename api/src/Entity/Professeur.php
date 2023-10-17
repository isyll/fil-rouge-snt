<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\ProfesseurRepository;
use App\State\ProfesseurProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProfesseurRepository::class)]
#[ApiResource(
    operations: [new Get, new GetCollection, new Post(processor: ProfesseurProcessor::class)],
    denormalizationContext: ['groups' => 'write'],
    normalizationContext: ['groups' => 'read']
)]
class Professeur
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read', 'write'])]
    private ?string $prenom = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read', 'write'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read', 'write'])]
    private ?string $specialite = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read', 'write'])]
    private ?string $grade = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['read'])]
    private ?string $matricule = null;

    #[ORM\OneToMany(mappedBy: 'professeur', targetEntity: SessionCours::class)]
    #[Groups(['read'])]
    private Collection $sessionCours;

    #[ORM\Column(length: 255)]
    #[Groups(['read', 'write'])]
    private ?string $email = null;

    public function __construct()
    {
        $this->sessionCours = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
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

    public function getSpecialite(): ?string
    {
        return $this->specialite;
    }

    public function setSpecialite(string $specialite): static
    {
        $this->specialite = $specialite;

        return $this;
    }

    public function getGrade(): ?string
    {
        return $this->grade;
    }

    public function setGrade(string $grade): static
    {
        $this->grade = $grade;

        return $this;
    }

    public function getMatricule(): ?string
    {
        return $this->matricule;
    }

    public function setMatricule(string $matricule): static
    {
        $this->matricule = $matricule;

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
            $sessionCour->setProfesseur($this);
        }

        return $this;
    }

    public function removeSessionCour(SessionCours $sessionCour): static
    {
        if ($this->sessionCours->removeElement($sessionCour)) {
            // set the owning side to null (unless already changed)
            if ($sessionCour->getProfesseur() === $this) {
                $sessionCour->setProfesseur(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }
}
