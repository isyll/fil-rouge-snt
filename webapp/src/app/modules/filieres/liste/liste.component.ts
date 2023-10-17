import { Component, OnInit } from '@angular/core';
import { FiliereService } from 'src/app/core/openapi';
import { InfoCardService } from 'src/app/core/services/info-card.service';

@Component({
  selector: 'liste-filieres',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class FilieresComponent implements OnInit {
  data: any;
  requestPending: boolean = false;
  colors!: string[];

  constructor(
    private filiereService: FiliereService,
    private infosCardService: InfoCardService
  ) {
    this.colors = this.infosCardService.getColors();
  }

  ngOnInit(): void {
    this.requestPending = true;

    this.filiereService
      .apiFilieresGetCollection()
      .subscribe((response: any) => {
        this.data = response;
        this.requestPending = false;
      });
  }
}
