import { Component, OnInit } from '@angular/core';
import { AnneeScolaireService } from '../../../core/openapi';
import { ApiAnneeScolairesGetCollection200Response } from '../../../core/openapi';
import { InfoCardService } from '../../../core/services/info-card.service';

@Component({
  selector: 'app-annees-scolaires',
  templateUrl: './annees-scolaires.component.html',
  styleUrls: ['./annees-scolaires.component.scss'],
})
export class AnneesScolairesComponent implements OnInit {
  anneesScolaires!: ApiAnneeScolairesGetCollection200Response;
  dataCompleted: boolean = false;
  colors!: string[];

  constructor(
    private service: AnneeScolaireService,
    private infoCardService: InfoCardService
  ) {}

  ngOnInit(): void {
    this.colors = this.infoCardService.getColors();

    this.service.apiAnneeScolairesGetCollection().subscribe((response) => {
      console.log(response);
      this.anneesScolaires = response;
      this.dataCompleted = true;
    });
  }
}
