import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'accueil-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
  @Input()
  bg!: string;
  @Input()
  title!: string;
  @Input()
  icon!: string;
  @Input()
  data!: string;
  @Input()
  lastTitle!: string;
  @Input()
  lastData!: string;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered modal custom-modal',
    });
  }
}
