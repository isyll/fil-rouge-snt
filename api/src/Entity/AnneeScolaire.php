<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\AnneeScolaireRepository;
use App\Validator\Constraints\AnneeScolaireFormat;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AnneeScolaireRepository::class)]
#[UniqueEntity('libelle', message: 'Le libellé est manquant')]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => 'item:read']
        ),
        new GetCollection,
        new Put,
        new Post,
    ],
    denormalizationContext: ['groups' => ['write']],
    normalizationContext: ['groups' => ['read']]
)]
#[ApiFilter(SearchFilter::class, properties: ['libelle' => 'exact'])]
class AnneeScolaire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotNull(message: 'Le libellé est manquant')]
    #[AnneeScolaireFormat]
    #[Groups(['write', 'read', 'item:read'])]
    private ?string $libelle = null;

    #[ORM\OneToMany(targetEntity: Inscription::class, mappedBy: 'annee_scolaire')]
    #[Groups(['item:read'])]
    private Collection $inscriptions;

    #[ORM\OneToMany(mappedBy: 'annee_scolaire', targetEntity: Ouverture::class)]
    #[Groups(['item:read'])]
    private Collection $ouvertures;

    #[ORM\OneToMany(mappedBy: 'annee_scolaire', targetEntity: Cours::class)]
    private Collection $cours;

    public function __construct()
    {
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
            $ouverture->setAnneeScolaire($this);
        }

        return $this;
    }

    public function removeOuverture(Ouverture $ouverture): static
    {
        if ($this->ouvertures->removeElement($ouverture)) {
            // set the owning side to null (unless already changed)
            if ($ouverture->getAnneeScolaire() === $this) {
                $ouverture->setAnneeScolaire(null);
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
            $cour->setAnneeScolaire($this);
        }

        return $this;
    }

    public function removeCour(Cours $cour): static
    {
        if ($this->cours->removeElement($cour)) {
            // set the owning side to null (unless already changed)
            if ($cour->getAnneeScolaire() === $this) {
                $cour->setAnneeScolaire(null);
            }
        }

        return $this;
    }
}
