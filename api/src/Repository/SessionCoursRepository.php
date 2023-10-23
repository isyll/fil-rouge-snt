<?php

namespace App\Repository;

use App\Entity\Professeur;
use App\Entity\Salle;
use App\Entity\SessionCours;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SessionCours>
 *
 * @method SessionCours|null find($id, $lockMode = null, $lockVersion = null)
 * @method SessionCours|null findOneBy(array $criteria, array $orderBy = null)
 * @method SessionCours[]    findAll()
 * @method SessionCours[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SessionCoursRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SessionCours::class);
    }

    public function save(SessionCours $sessionCours, $flush = false)
    {
        $this->getEntityManager()->persist($sessionCours);

        if ($flush)
            $this->getEntityManager()->flush();
    }

    public function flush()
    {
        $this->getEntityManager()->flush();
    }


    public function salleOccupes(Salle $salle, \DateTimeInterface $date): array
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.salle = :salle')
            ->andWhere('s.date = :date')
            ->setParameter('salle', $salle)
            ->setParameter('date', $date)
            ->getQuery()
            ->getResult()
        ;
    }

    public function autresSalleOccupes(SessionCours $sessionCours, Salle $salle, \DateTimeInterface $date): array {
        return $this->createQueryBuilder('s')
            ->andWhere('s.salle = :salle')
            ->andWhere('s.date = :date')
            ->andWhere('s.id != :id')
            ->setParameter('salle', $salle)
            ->setParameter('date', $date)
            ->setParameter('id', $sessionCours->getId())
            ->getQuery()
            ->getResult()
        ;
    }

    public function getProfesseurSessionCours(Professeur $professeur, \DateTimeInterface $date): array
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.date = :date')
            ->andWhere('s.professeur = :professeur')
            ->setParameter('date', $date)
            ->setParameter('professeur', $professeur)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getProfesseurAutresSessionCours(SessionCours $sessionCours, Professeur $professeur, \DateTimeInterface $date): array
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.date = :date')
            ->andWhere('s.professeur = :professeur')
            ->andWhere('s.id != :id')
            ->setParameter('date', $date)
            ->setParameter('professeur', $professeur)
            ->setParameter('id', $sessionCours->getId())
            ->getQuery()
            ->getResult()
        ;
    }

    public function updateAndSaveValidation(SessionCours $sc, bool $value)
    {
        $sc->setValide($value);
        $this->getEntityManager()->persist($sc);
        $this->getEntityManager()->flush();
    }

//    /**
//     * @return SessionCours[] Returns an array of SessionCours objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

    //    public function findOneBySomeField($value): ?SessionCours
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
