import { Component } from '@angular/core';
import { ModuleService } from 'src/app/core/openapi';
import { InfoCardService } from 'src/app/core/services/info-card.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ListeComponent {
  data: any;
  requestPending = false;
  colors!: string[];

  constructor(
    private moduleService: ModuleService,
    private infosCardService: InfoCardService
  ) {
    this.colors = this.infosCardService.getColors();
  }

  ngOnInit(): void {
    this.requestPending = true;

    this.moduleService.apiModulesGetCollection().subscribe((response: any) => {
      setTimeout(() => {
        this.data = response;
        this.requestPending = false;
      }, 500);
    });
  }
}
