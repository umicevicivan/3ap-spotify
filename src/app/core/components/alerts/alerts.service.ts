import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlertModalComponent, AlertModalOptions } from './alert-modal/alert-modal.component';

export interface ToastMessage {
    id?: number;
    title?: string;
    content?: string;
    classname?: string;
    icon?: string;
    delay?: number;
}

export interface PopupMessage {
    id?: number;
    options: AlertModalOptions;
}

@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    constructor(private ngbModal: NgbModal) {
    }

    confirm(title: string, message: string = ''): Promise<boolean> {
        const options: AlertModalOptions = {
            title,
            text: message,
            showCancelButton: true,
            showConfirmButton: true,
            focusCancel: true,
            icon: 'question',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            confirmButtonValue: 'confirmed',
            cancelButtonValue: 'canceled'
        };
        return this.popup({options})
            .then(result => result === 'confirmed')
            .catch(() => Promise.resolve(false));
    }

    httpError(title: string, message: string): void {
        const options: AlertModalOptions = {
            title,
            text: message,
            showCancelButton: false,
            showConfirmButton: true,
            showCloseButton: true,
            icon: 'error'
        };
        this.popup({options}).then(() => null).catch(() => null);
    }

    private popup(message: PopupMessage): Promise<any> {
        const modalRef = this.ngbModal.open(AlertModalComponent, {
            centered: true,
            windowClass: 'modal-alert'
        });
        modalRef.componentInstance.options = message.options;
        return modalRef.result;
    }
}
