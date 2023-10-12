import { Component, OnInit } from '@angular/core';
import { ProfesseurService } from 'src/app/core/openapi';
import { InfoCardService } from 'src/app/core/services/info-card.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ListeComponent implements OnInit {
  professeurs!: any[];
  colors!: any[];
  requestPending = false;

  constructor(
    private professeurService: ProfesseurService,
    private infoCardService: InfoCardService
  ) {}

  ngOnInit(): void {
    this.colors = this.infoCardService.getColors();
    this.requestPending = true;

    this.professeurService
      .apiProfesseursGetCollection()
      .subscribe((response: any) => {
        this.requestPending = false;
        this.professeurs = response['hydra:member'];
      });
  }
}
