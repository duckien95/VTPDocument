import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';
import { HttpClientService } from '../../common/http-client.service';

@Injectable()
export class RadioService {

   constructor(
      private httpClient: HttpClientService
   ) {}

   searchRadio(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioSearch, obj);
   }

   getListRadio(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioGet, obj);
   }

   getRadioById(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioGetById, obj);
   }

   createRadio(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioCreate, obj);
   }

   updateRadio(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioUpdate, obj);
   }

   deleteRadio(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioDelete, obj);
   }

   searchRadioSchedule(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioScheduleSearch, obj);
   }

   getListRadioSchedule(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioScheduleGet, obj);
   }

   getRadioScheduleById(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioScheduleGetById, obj);
   }

   getRadioScheduleByParent(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioScheduleGetByParent, obj);
   }

   createRadioSchedule(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioScheduleCreate, obj);
   }

   updateRadioSchedule(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioScheduleUpdate, obj);
   }

   deleteRadioSchedule(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathRadioScheduleDelete, obj);
   }

   uploadMediaFile(file) {
      return this.httpClient.postMediaFile(ConfigSetting.UrlPathWebUploadMediaFile, file);
      // return this.httpClient.postMediaFile(ConfigSetting.UrlPathWebUploadImage, file);
   }
}
