import { Component } from '@angular/core';
import { SalleService } from 'src/app/core/openapi';
import { InfoCardService } from 'src/app/core/services/info-card.service';

@Component({
  selector: 'salles-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ListeComponent {
  salles!: any[];
  colors!: any[];
  requestPending = false;

  constructor(
    private salleService: SalleService,
    private infoCardService: InfoCardService
  ) {}

  ngOnInit(): void {
    this.colors = this.infoCardService.getColors();
    this.requestPending = true;

    this.salleService
      .apiSallesGetCollection()
      .subscribe((response: any) => {
        this.requestPending = false;
        this.salles = response['hydra:member'];
      });
  }
}
