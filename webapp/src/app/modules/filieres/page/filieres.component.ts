import { Component, OnInit } from '@angular/core';
import { FiliereService } from 'src/app/core/openapi';

@Component({
  selector: 'page-filieres',
  templateUrl: './filieres.component.html',
  styleUrls: ['./filieres.component.scss'],
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
