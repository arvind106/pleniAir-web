import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/components/common/messageservice';
import {ApiServiceService} from './api-service.service';
import {config} from '../constant';
import {NgbModalRef, ModalDismissReasons, NgbModal} from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl} from '../../../node_modules/@angular/forms';
import { style } from '@angular/animations';

@Injectable()
export class CommonService {

    loading: any;
    Templates: {};
    modalReference: NgbModalRef;
    closeResult: string;
    Patient: any;
    Members: any[] = [];
    // msgs: Message[] = [];
    // spinnerShow: boolean;

    constructor(
        private messageService: MessageService,
        public apiService: ApiServiceService, 
        public modalService: NgbModal)
         {

    }

    basicAlert(message) {
        //let alert = this.alertCtrl.create({
        //    subTitle: message,
        //    buttons: ['OKAY']
        //});
        //alert.present();
    }

    showSuccess(message) {
          this.messageService.add({severity: 'success', summary: 'Success!', detail: message});
          return;
    }

    showError(message) {
        this.messageService.add({severity: 'error', summary: 'Oops!', detail: message});
        return;
    }

    showLoader() {
        // this.spinnerShow = true;
        // if (this.loading == null) {
        //     this.loading = this.loadingCtrl.create({
        //         content: this.PleaseWait
        //     });
        //     this.loading.present();
        // }
        // this.spinnerService.show();
    }

    dismissLoader() {
        // this.spinnerShow = false;
        // this.spinnerService.hide();
        // if (this.loading != null) {
        //     this.loading.dismiss();
        //     this.loading = null;
        // }
    }
    OnlyAlphabets(event: any) {
        const pattern = /[a-zA-Z ]/g;

        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}