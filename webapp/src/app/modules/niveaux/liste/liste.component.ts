import { Component } from '@angular/core';
import { NiveauService } from 'src/app/core/openapi';

@Component({
  selector: 'liste-niveaux',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class NiveauxComponent {
  data: any;
  requestPending = false;

  constructor(private niveauService: NiveauService) {}

  ngOnInit(): void {
    this.requestPending = true;

    this.niveauService.apiNiveauxGetCollection().subscribe((response: any) => {
      this.data = response;
      this.requestPending = false;
    });
  }
}
