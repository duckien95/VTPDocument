import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';
import { HttpClientService } from '../../common/http-client.service';

@Injectable()
export class NoteService {

   constructor(
      private httpClient: HttpClientService
   ) { }

   //****************  OFFER PRICE *****************
   getListOfferPrice() {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathOfferPriceGet,{});
   }

   getOfferPriceById(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathOfferPriceGetById,obj);
   }

   updateOfferPrice(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathOfferPriceUpdate, obj);
   }

   searchOfferPrice(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathOfferPriceSearch, obj);
   }

   //****************CONSULT SERVICE *****************
   getListConsultService() {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathConsultServiceGet,{});
   }

   getConsultServiceById(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathConsultServiceGetById,obj);
   }

   updateConsultService(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathConsultServiceUpdate, obj);
   }

   searchConsultService(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathConsultServiceSearch, obj);
   }

   //**************** REGISTER AGENCY *****************
   getListRegisterAgency() {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRegisterAgencyGet,{});
   }

   getRegisterAgencyById(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRegisterAgencyGetById,obj);
   }

   updateRegisterAgency(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRegisterAgencyUpdate, obj);
   }

   searchRegisterAgency(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRegisterAgencySearch, obj);
   }

}
