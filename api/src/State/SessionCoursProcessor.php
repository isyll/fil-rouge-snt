<?php

namespace App\State;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\SessionCours;
use App\Exception\SalleOccupeException;
use App\Exception\SalleTropPetiteException;
use App\Exception\SessionCoursTimeException;
use App\Repository\SessionCoursRepository;
use App\Service\SessionCoursService;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class SessionCoursProcessor implements ProcessorInterface
{
    public function __construct(
        private SessionCoursRepository $sessionCoursRepository,
        private SessionCoursService $sessionCoursService,
        #[Autowire(service: PersistProcessor::class)]
        private ProcessorInterface $processor
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        $previousData = null;
        if ($operation instanceof Put)
            $previousData = $context['previous_data'];

        if (!$this->validateTime($data->getHeureDebut()))
            throw new SessionCoursTimeException("L'heure de début est invalide");
        if (!$this->validateTime($data->getHeureFin()))
            throw new SessionCoursTimeException("L'heure de fin est invalide");
        if (!$this->validateTime($data->getDuree()))
            throw new SessionCoursTimeException("La durée est invalide");
        if ($this->time2number($data->getHeureDebut()) >= $this->time2number($data->getHeureFin()))
            throw new SessionCoursTimeException("Les heures que vous indiquez sont invalides");

        $sessionCours = $operation instanceof Post
            ? $this->sessionCoursRepository->salleOccupes($data->getSalle(), $data->getDate())
            : $this->sessionCoursRepository->autresSalleOccupes($previousData, $previousData->getSalle(), $previousData->getDate());

        if ($sessionCours) {
            $heureDebut = $this->time2number($data->getHeureDebut());
            $heureFin   = $this->time2number($data->getHeureFin());

            foreach ($sessionCours as $sc) {
                $heureDebutSessionCours = $this->time2number($sc->getHeureDebut());
                $heureFinSessionCours   = $this->time2number($sc->getHeureFin());

                if ($heureDebutSessionCours <= $heureDebut && $heureDebut <= $heureFinSessionCours)
                    throw new SalleOccupeException("La salle n'est pas libre pour le moment que vous indiquez");
                if ($heureDebut <= $heureDebutSessionCours && $heureDebutSessionCours <= $heureFin)
                    throw new SalleOccupeException("La salle n'est pas libre pour le moment que vous indiquez");
            }
        }

        $classe = $data->getCours()->getClasse();
        $salle  = $data->getSalle();

        if ($classe->getNbEtudiants() > $salle->getPlaces())
            throw new SalleTropPetiteException('La salle que vous avez choisi est trop petite pour la classe ' + $classe->getLibelle());
        if ($previousData) {
            $this->processor->process($data, $operation, $uriVariables, $context);

            $reflection = new \ReflectionClass(SessionCours::class);
            $id = $reflection->getProperty('id');
            $id->setAccessible(true);

            $id->setValue($data, $previousData->getId());

        } else
            $this->sessionCoursRepository->save($data, true);
    }

    private function validateTime(string $time): bool
    {
        try {
            if (count($data = explode(':', $time)) === 2) {
                if (!is_numeric($data[0]) || !is_numeric($data[1]))
                    return false;

                $hours   = (int) $data[0];
                $minutes = (int) $data[1];

                if ($hours >= 24 || $hours < 0 || $minutes >= 60 || $minutes < 0)
                    return false;

                return true;
            }

            return false;
        }
        catch (\ValueError $e) {
            return false;
        }
    }

    private function time2number(string $time): int
    {
        list($hours, $minutes) = explode(':', $time);

        return $hours * 60 + $minutes;
    }
}
