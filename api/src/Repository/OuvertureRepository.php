<?php

namespace App\Repository;

use App\Entity\Ouverture;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Ouverture>
 *
 * @method Ouverture|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ouverture|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ouverture[]    findAll()
 * @method Ouverture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OuvertureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ouverture::class);
    }

    /**
    * @return Ouverture[] Returns an array of Ouverture objects
    */
    public function findOuverture(Ouverture $value): array
    {
        return $this->createQueryBuilder('o')
            ->join('o.annee_scolaire', 'a')
            ->join('o.classe', 'c')
            ->andWhere('a.id = :anneeScolaire')
            ->andWhere('c.id = :classe')
            ->setParameters([
                'anneeScolaire' => $value->getAnneeScolaire(),
                'classe' => $value->getClasse(),
            ])
            ->getQuery()
            ->getResult()
        ;
    }

    public function save(Ouverture $ouverture, $flush = false)
    {
        $this->getEntityManager()->persist($ouverture);

        if ($flush)
            $this->getEntityManager()->flush();
    }

//    /**
//     * @return Ouverture[] Returns an array of Ouverture objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Ouverture
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
