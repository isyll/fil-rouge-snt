import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/core/openapi';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  data: any;

  constructor(private classeService: ClasseService) {}

  ngOnInit(): void {
    this.classeService.apiClassesGetCollection().subscribe((response: any) => {

      this.data = response;
    });
  }
}
