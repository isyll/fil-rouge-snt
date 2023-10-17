import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/core/openapi';
import { InfoCardService } from 'src/app/core/services/info-card.service';

@Component({
  selector: 'liste-classes',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ClassesComponent implements OnInit {
  data: any;
  requestPending = false;
  colors!: string[];

  constructor(
    private classeService: ClasseService,
    private infosCardService: InfoCardService
  ) {
    this.colors = this.infosCardService.getColors();
  }

  ngOnInit(): void {
    this.requestPending = true;

    this.classeService.apiClassesGetCollection().subscribe((response: any) => {
      this.data = response;
      this.requestPending = false;
    });
  }
}
