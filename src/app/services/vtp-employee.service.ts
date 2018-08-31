import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';

@Injectable()
export class VtpEmployeeService {

   constructor(
      private httpClient: HttpClientService
   ) { }

   addSecondEmail(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathEmployeeAddSecondEmail, obj);
   }

   deactivateEmail(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathEmployeeDeactivateEmail, obj);
   }

   deactivateAccount(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathEmployeeDeactivateAccount, obj);
   }

   searchEmployee(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathEmployeeSearch, obj);
   }

   getListEmployee(){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathEmployeeGet, {});
   }

   getEmployeeById(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathEmployeeGetById, obj);
   }

   getParentOrganization(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathEmployeeGetParent, obj);
   }

   getChildOrganization(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathEmployeeGetChild, obj);
   }

   getUrlExportInactivateAccount() {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathExportInactivateEmail, {});
   }
}
