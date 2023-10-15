<?php

namespace App\Service;

use App\Entity\SessionCours;
use App\Repository\SessionCoursRepository;

class SessionCoursService
{
    public function __construct(private SessionCoursRepository $sessionCoursRepository)
    {
    }

    public function copyData(SessionCours $source, SessionCours $destination)
    {
        $destination->setCours($source->getCours());
        $destination->setDate($source->getDate());
        $destination->setDuree($source->getDuree());
        $destination->setHeureDebut($source->getHeureDebut());
        $destination->setHeureFin($source->getHeureFin());
        $destination->setSalle($source->getSalle());
    }
}
