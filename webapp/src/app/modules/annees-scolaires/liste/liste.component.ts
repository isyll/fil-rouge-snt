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
  dataCompleted: boolean = false;
  colors!: string[];

  constructor(
    private service: AnneeScolaireService,
    private infoCardService: InfoCardService
  ) {}

  ngOnInit(): void {
    this.colors = this.infoCardService.getColors();

    this.service.apiAnneeScolairesGetCollection().subscribe((response: any) => {
      console.log(response);
      this.anneesScolaires = response;
      this.dataCompleted = true;
    });
  }
}