import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/core/openapi';

@Component({
  selector: 'liste-classes',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ClassesComponent implements OnInit {
  data: any;
  requestPending = false;

  constructor(private classeService: ClasseService) {}

  ngOnInit(): void {
    this.requestPending = true;

    this.classeService.apiClassesGetCollection().subscribe((response: any) => {
      this.data = response;
      this.requestPending = false;
    });
  }
}
