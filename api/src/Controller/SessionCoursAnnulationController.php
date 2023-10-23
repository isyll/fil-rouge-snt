<?php

namespace App\Controller;

use App\Exception\SessionCoursInexistantException;
use App\Repository\SessionCoursRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SessionCoursAnnulationController extends AbstractController
{
    public function __construct(
        private SessionCoursRepository $sessionCoursRepository
    ) {
    }

    public function __invoke(Request $request, int $id)
    {
        $sessionCours = $this->sessionCoursRepository->find($id);
        if ($sessionCours) {
            $data = json_decode($request->getContent(), true);
            if (isset($data['valide']))
                $this->sessionCoursRepository->updateAndSaveAnnulation($sessionCours, (bool) $data['annule']);
        } else
            throw new SessionCoursInexistantException("Session de cours inexistant");

        return $sessionCours;
    }
}
