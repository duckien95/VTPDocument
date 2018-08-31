import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { NoteService } from '../../../services/marketing-management/note.service';
import { OfferPriceModel } from '../../../models/marketing-management/notes/offer-price-model';

declare var $: any;

@Component({
  selector: 'app-offer-price-update',
  templateUrl: './offer-price-update.component.html',
  styleUrls: ['./offer-price-update.component.css']
})
export class OfferPriceUpdateComponent implements OnInit {
   @Output() reloadOfferPriceEvent = new EventEmitter();
   @ViewChild('offerPriceUpdate') offerPriceForm: any;

   offerPriceModel: OfferPriceModel;
   offerPriceId: string;
   previousNote: string;
   newNote: string;
   statuses: any;
   formValid: boolean;
   configSetting = ConfigSetting;
   constructor(
      private noteService: NoteService
   ) { }

   ngOnInit() {
      this.initOfferPrice();
      this.formValid = true;
      this.statuses = ConfigSetting.ListStatusNote;
   }

   initOfferPrice() {
      this.newNote = '';
      if(this.offerPriceId != undefined) {
         this.noteService.getOfferPriceById({ 'offerPriceId': this.offerPriceId }).subscribe( res => {
            console.log(res);
            if(!res.error) {
               this.offerPriceModel = res.data;
               if(res.data.status == 0) {
                  this.offerPriceModel.status = -100;
               }
               // this.offerPriceModel.note = '';
               // this.previousNote = res.data.note;
            }
         })
      } else {
         this.offerPriceModel = new OfferPriceModel();
      }
   }

   resetAndReload() {
      this.reloadOfferPriceEvent.emit();
      this.offerPriceForm.reset();
      $('#offer-price-update').modal('hide');
   }

   onUpdateOfferPrice(form) {
      // let newNote = this.offerPriceModel.note;
      this.formValid= form.valid;
      if(form.valid) {
         this.offerPriceModel.note = this.offerPriceModel.note + " \n " +  ConfigSetting.formatNote(this.newNote);
         console.log(this.offerPriceModel.note);
         this.noteService.updateOfferPrice(this.offerPriceModel).subscribe( res => {
            if(!res.error) {
               ConfigSetting.ShowSuccess('Update success');
               this.resetAndReload();

            } else {
               ConfigSetting.ShowError(res.message);
            }
         })
      } else {
         ConfigSetting.ShowError("Can not update");
      }

   }

}
