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
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AnneeScolaireRepository::class)]
#[UniqueEntity('libelle', message: 'Le libellé est manquant')]
#[ApiResource(
    operations: [new Get, new GetCollection, new Put, new Post],
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
    #[Groups(['write', 'read'])]
    private ?string $libelle = null;

    #[ORM\OneToMany(targetEntity: Inscription::class, mappedBy: 'annee_scolaire')]
    private Collection $inscriptions;

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
}
