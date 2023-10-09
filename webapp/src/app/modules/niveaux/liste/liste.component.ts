import { Component } from '@angular/core';
import { NiveauService } from 'src/app/core/openapi';

@Component({
  selector: 'liste-niveaux',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class NiveauxComponent {
  data: any;

  constructor(private niveauService: NiveauService) {}

  ngOnInit(): void {
    this.niveauService.apiNiveauxGetCollection().subscribe((response: any) => {
      this.data = response;
    });
  }
}
