<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\EtudiantRepository;
use App\State\EtudiantProcessor;
use App\Validator\Constraints\TelephoneFormat;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: EtudiantRepository::class)]
#[UniqueEntity('email', message: "L'adresse email existe déjà")]
#[UniqueEntity('telephone', message: "Le numéro de téléphone existe déjà")]
#[ApiResource(
    operations: [new Get, new GetCollection, new Put, new Post(processor: EtudiantProcessor::class)],
    denormalizationContext: ['groups' => ['write']],
    normalizationContext: ['groups' => ['read']]
)]
class Etudiant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotNull(message: 'Le prénom est manquant')]
    #[Groups(['write', 'read'])]
    private ?string $prenom = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotNull(message: 'Le nom est manquant')]
    #[Groups(['write', 'read'])]
    private ?string $nom = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Assert\NotNull(message: 'La date de naissance est manquante')]
    #[Groups(['write', 'read'])]
    private ?\DateTimeInterface $naissance = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotNull(message: 'Le numéro de téléphone est manquant')]
    #[TelephoneFormat]
    #[Groups(['write', 'read'])]
    private ?string $telephone = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotNull(message: "L'adresse email est manquante")]
    #[Assert\Email(message: "L'adresse email '{{ value }}' n'est pas valide.")]
    #[Groups(['write', 'read'])]
    private ?string $email = null;

    #[ORM\OneToMany(targetEntity: Inscription::class, mappedBy: 'etudiant')]
    private Collection $inscriptions;
    public function __construct()
    {
        $this->classes = new ArrayCollection();
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

    public function getNaissance(): ?\DateTimeInterface
    {
        return $this->naissance;
    }

    public function setNaissance(\DateTimeInterface $naissance): static
    {
        $this->naissance = $naissance;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): static
    {
        $this->telephone = $telephone;

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
