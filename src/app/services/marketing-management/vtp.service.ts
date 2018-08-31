import { Injectable } from '@angular/core';
import { VtpServiceModel } from '../../models/marketing-management/services/vtp-service-model';
import { ConfigSetting } from '../../common/configSetting';
import { HttpClientService } from '../../common/http-client.service';

@Injectable()
export class VtpService {

   constructor(
      private httpClient: HttpClientService,
      // private configSetting: ConfigSetting
   ) { }

   searchService(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathServiceSearch, obj);
   }

   getListService(obj){
      // console.log(obj);
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathServiceGet , obj);
   }

   getListSiblingService(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathServiceSiblingGet, obj);
   }

   getListParentService(){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathServiceParentGet, {});
   }

   getListChildService(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathServiceChildGet, obj);
   }

   createService(vtpServiceModel){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathServiceCreate, vtpServiceModel);
   }

   updateService(vtpServiceModel){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathServiceUpdate, vtpServiceModel);
   }

   deleteService(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathServiceDelete, obj);
   }


}
