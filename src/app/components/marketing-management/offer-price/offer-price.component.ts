import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { NoteService } from '../../../services/marketing-management/note.service';
import { OfferPriceModel } from '../../../models/marketing-management/notes/offer-price-model';
import { OfferPriceSearch } from '../../../models/marketing-management/search-model';
import { OfferPriceUpdateComponent } from '../offer-price-update/offer-price-update.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-offer-price',
  templateUrl: './offer-price.component.html',
  styleUrls: ['./offer-price.component.css']
})
export class OfferPriceComponent implements OnInit {

   @ViewChild(OfferPriceUpdateComponent) offerPriceUpdate: OfferPriceUpdateComponent;
   ListOfferPrice: OfferPriceModel[];
   searchParams: OfferPriceSearch;
   statuses: any;
   pageSize: number = 24;
   pageIndex: number = 0;
   constructor(
      private noteService: NoteService
   ) { }

   ngOnInit() {
      this.searchParams = new OfferPriceSearch();
      this.statuses = ConfigSetting.ListStatusNoteSearch;
      this.loadListOfferPrice();
   }

   searchOfferPrice() {
      this.noteService.searchOfferPrice(this.searchParams).subscribe (res => {
         if(!res.error) {
            this.ListOfferPrice = res.data;
         } else {
            this.ListOfferPrice = [];
         }
      })
   }

   loadListOfferPrice() {
      this.noteService.getListOfferPrice().subscribe( res => {
         if(!res.error) {
            this.ListOfferPrice = res.data;
         }
      })
   }

   onShowUpdateOfferPrice(id) {
      this.offerPriceUpdate.offerPriceId = id;
      this.offerPriceUpdate.initOfferPrice();
      $('#offer-price-update').modal('show');
   }



}
