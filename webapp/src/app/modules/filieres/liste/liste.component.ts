import { Component, OnInit } from '@angular/core';
import { FiliereService } from 'src/app/core/openapi';

@Component({
  selector: 'liste-filieres',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class FilieresComponent implements OnInit {
  data: any;

  constructor(private filiereService: FiliereService) {}

  ngOnInit(): void {
    this.filiereService
      .apiFilieresGetCollection()
      .subscribe((response: any) => {
        this.data = response;
      });
  }
}
