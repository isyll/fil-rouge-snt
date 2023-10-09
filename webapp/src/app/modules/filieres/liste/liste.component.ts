import { Component, OnInit } from '@angular/core';
import { FiliereService } from 'src/app/core/openapi';

@Component({
  selector: 'liste-filieres',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class FilieresComponent implements OnInit {
  data: any;
  requestPending: boolean = false;

  constructor(private filiereService: FiliereService) {}

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
