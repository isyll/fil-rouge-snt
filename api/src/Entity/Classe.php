<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ClasseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ClasseRepository::class)]
#[UniqueEntity('libelle', message: 'Le libellé existe déjà')]
#[ApiResource(
    operations: [new Get, new GetCollection, new Put, new Post],
    // denormalizationContext: ['groups' => ['write']],
    normalizationContext: ['groups' => ['read']]
)]
#[ApiFilter(SearchFilter::class, properties: ['libelle' => 'exact'])]
class Classe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotNull(message: 'Le libellé est manquant')]
    #[Groups(['write', 'read'])]
    private ?string $libelle = null;

    #[ORM\OneToMany(targetEntity: Inscription::class, mappedBy: 'classe')]
    private Collection $inscriptions;

    #[ORM\ManyToOne(inversedBy: 'classes')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['read'])]
    private ?Niveau $niveau = null;

    #[ORM\ManyToOne(inversedBy: 'classes')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['read'])]
    private ?Filiere $filiere = null;

    #[ORM\OneToMany(mappedBy: 'classe', targetEntity: Ouverture::class)]
    #[Groups(['read'])]
    private Collection $ouvertures;

    #[ORM\OneToMany(mappedBy: 'classe', targetEntity: Cours::class)]
    #[Groups(['read'])]
    private Collection $cours;

    #[ORM\Column(nullable: true)]
    #[Groups(['read'])]
    private ?int $nbEtudiants = null;

    public function __construct()
    {
        $this->inscriptions = new ArrayCollection();
        $this->ouvertures = new ArrayCollection();
        $this->cours = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Inscription>
     */
    public function getInscriptions(?AnneeScolaire $annee_scolaire = null): Collection
    {
        return $this->inscriptions;
    }

    public function addInscriptions(Inscription $inscription): static
    {
        if (!$this->inscriptions->contains($inscription)) {
            $this->inscriptions->add($inscription);
        }

        return $this;
    }

    public function removeInscriptions(Inscription $inscription): static
    {
        $this->inscriptions->removeElement($inscription);

        return $this;
    }

    public function getNiveau(): ?Niveau
    {
        return $this->niveau;
    }

    public function setNiveau(?Niveau $niveau): static
    {
        $this->niveau = $niveau;

        return $this;
    }

    public function getFiliere(): ?Filiere
    {
        return $this->filiere;
    }

    public function setFiliere(?Filiere $filiere): static
    {
        $this->filiere = $filiere;

        return $this;
    }

    /**
     * @return Collection<int, Ouverture>
     */
    public function getOuvertures(): Collection
    {
        return $this->ouvertures;
    }

    public function addOuverture(Ouverture $ouverture): static
    {
        if (!$this->ouvertures->contains($ouverture)) {
            $this->ouvertures->add($ouverture);
            $ouverture->setClasse($this);
        }

        return $this;
    }

    public function removeOuverture(Ouverture $ouverture): static
    {
        if ($this->ouvertures->removeElement($ouverture)) {
            // set the owning side to null (unless already changed)
            if ($ouverture->getClasse() === $this) {
                $ouverture->setClasse(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Cours>
     */
    public function getCours(): Collection
    {
        return $this->cours;
    }

    public function addCour(Cours $cour): static
    {
        if (!$this->cours->contains($cour)) {
            $this->cours->add($cour);
            $cour->setClasse($this);
        }

        return $this;
    }

    public function removeCour(Cours $cour): static
    {
        if ($this->cours->removeElement($cour)) {
            // set the owning side to null (unless already changed)
            if ($cour->getClasse() === $this) {
                $cour->setClasse(null);
            }
        }

        return $this;
    }

    public function getNbEtudiants(): ?int
    {
        return $this->nbEtudiants;
    }

    public function setNbEtudiants(int $nbEtudiants): static
    {
        $this->nbEtudiants = $nbEtudiants;

        return $this;
    }
}
