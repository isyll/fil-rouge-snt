export * from './anneeScolaire.service';
import { AnneeScolaireService } from './anneeScolaire.service';
export * from './classe.service';
import { ClasseService } from './classe.service';
export * from './cours.service';
import { CoursService } from './cours.service';
export * from './etudiant.service';
import { EtudiantService } from './etudiant.service';
export * from './filiere.service';
import { FiliereService } from './filiere.service';
export * from './inscription.service';
import { InscriptionService } from './inscription.service';
export * from './loginCheck.service';
import { LoginCheckService } from './loginCheck.service';
export * from './module.service';
import { ModuleService } from './module.service';
export * from './niveau.service';
import { NiveauService } from './niveau.service';
export * from './ouverture.service';
import { OuvertureService } from './ouverture.service';
export * from './param.service';
import { ParamService } from './param.service';
export * from './professeur.service';
import { ProfesseurService } from './professeur.service';
export * from './salle.service';
import { SalleService } from './salle.service';
export * from './sessionCours.service';
import { SessionCoursService } from './sessionCours.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [
  AnneeScolaireService,
  ClasseService,
  CoursService,
  EtudiantService,
  FiliereService,
  InscriptionService,
  LoginCheckService,
  ModuleService,
  NiveauService,
  OuvertureService,
  ParamService,
  ProfesseurService,
  SalleService,
  SessionCoursService,
  UserService,
];
