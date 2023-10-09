import { Component, OnInit } from '@angular/core';
import { AnneeScolaireService } from '../../../core/openapi';
import { InfoCardService } from '../../../core/services/info-card.service';

@Component({
  selector: 'liste-annees-scolaires',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class AnneesScolairesComponent implements OnInit {
  anneesScolaires!: any;
  requestPending = false;
  colors!: string[];

  constructor(
    private service: AnneeScolaireService,
    private infoCardService: InfoCardService
  ) {}

  ngOnInit(): void {
    this.colors = this.infoCardService.getColors();
    this.requestPending = true;

    this.service.apiAnneeScolairesGetCollection().subscribe((response: any) => {
      setTimeout(() => {
        this.anneesScolaires = response;
        this.requestPending = false;
      }, 500);
    });
  }
}
