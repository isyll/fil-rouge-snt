export * from './anneeScolaire.service';
import { AnneeScolaireService } from './anneeScolaire.service';
export * from './classe.service';
import { ClasseService } from './classe.service';
export * from './etudiant.service';
import { EtudiantService } from './etudiant.service';
export * from './filiere.service';
import { FiliereService } from './filiere.service';
export * from './inscription.service';
import { InscriptionService } from './inscription.service';
export * from './niveau.service';
import { NiveauService } from './niveau.service';
export * from './ouverture.service';
import { OuvertureService } from './ouverture.service';
export const APIS = [AnneeScolaireService, ClasseService, EtudiantService, FiliereService, InscriptionService, NiveauService, OuvertureService];
