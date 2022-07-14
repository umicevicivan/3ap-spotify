import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class AlertModalOptions {
  title: string;
  text: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonValue?: any;
  cancelButtonValue?: any;
  showCloseButton?: boolean;
  focusCancel?: boolean;
  icon?: 'warning' | 'error' | 'info' | 'success' | 'question';
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {

  options: AlertModalOptions = new AlertModalOptions();

  constructor(private modal: NgbActiveModal) {
  }

  close(): void {
    this.modal.dismiss('Close click');
  }

  cancel(result: any): void {
    this.modal.close(result);
  }

  confirm(result: any): void {
    this.modal.close(result);
  }
}
