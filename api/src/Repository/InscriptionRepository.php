<?php

namespace App\Repository;

use App\Entity\AnneeScolaire;
use App\Entity\Inscription;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Inscription>
 *
 * @method Inscription|null find($id, $lockMode = null, $lockVersion = null)
 * @method Inscription|null findOneBy(array $criteria, array $orderBy = null)
 * @method Inscription[]    findAll()
 * @method Inscription[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InscriptionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Inscription::class);
    }

    /**
    * @return Inscription[] Returns an array of Inscription objects
    */
    public function findInscription(Inscription $value): array
    {
        return $this->createQueryBuilder('i')
            ->join('i.annee_scolaire', 'a')
            ->join('i.classe', 'c')
            ->join('i.etudiant', 'e')
            ->andWhere('a.id = :anneeScolaire')
            ->andWhere('c.id = :classe')
            ->andWhere('e.id = :etudiant')
            ->setParameters([
                'anneeScolaire' => $value->getAnneeScolaire(),
                'classe' => $value->getClasse(),
                'etudiant' => $value->getEtudiant()
            ])
            ->getQuery()
            ->getResult()
        ;
    }

    public function save(Inscription $inscription, $flush = false)
    {
        $this->getEntityManager()->persist($inscription);

        if ($flush)
            $this->getEntityManager()->flush();
    }

//    /**
//     * @return Inscription[] Returns an array of Inscription objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Inscription
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
