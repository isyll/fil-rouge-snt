import { Component } from '@angular/core';
import { NiveauService } from 'src/app/core/openapi';
import { InfoCardService } from 'src/app/core/services/info-card.service';

@Component({
  selector: 'liste-niveaux',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class NiveauxComponent {
  data: any;
  requestPending = false;
  colors!: string[];

  constructor(
    private niveauService: NiveauService,
    private infosCardService: InfoCardService
  ) {
    this.colors = this.infosCardService.getColors();
  }

  ngOnInit(): void {
    this.requestPending = true;

    this.niveauService.apiNiveauxGetCollection().subscribe((response: any) => {
      this.data = response;
      this.requestPending = false;
    });
  }
}
