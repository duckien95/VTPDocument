import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting'
import { HttpClientService } from '../../../common/http-client.service';
import { BannerSearchRequest } from '../../../models/marketing-management/banner/banner/banner-search-request'
import { Banner } from '../../../models/marketing-management/banner/banner/banner';
import { BannerItemSearchRequest } from '../../../models/marketing-management/banner/banner-item/banner-item-search-request'
import { BannerItem } from '../../../models/marketing-management/banner/banner-item/banner-item';

@Injectable()
export class BannerService {

  constructor(private httpClient: HttpClientService) { }

   searchBanner(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerSearch, obj);
   }

   searchBannerItem(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerItemSearch, obj);
   }

   getListBanner(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerGet, obj);
   }

   getBannerById(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerGetById, obj);
   }

   createBanner(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerCreate, obj);
   }

   updateBanner(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerUpdate, obj);
   }

   deleteBanner(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerDelete, obj);
   }

   getListBannerItem(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerItemGet, obj);
   }

   getBannerItemById(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerItemGetById, obj);
   }

   getChildBannerItem(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerItemGetChild, obj);
   }

   createBannerItem(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerItemCreate, obj);
   }

   updateBannerItem(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerItemUpdate, obj);
   }

   deleteBannerItem(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathBannerItemDelete, obj);
   }

   saveBannerItemImage(file){
      return this.httpClient.postImage(ConfigSetting.UrlPathWebUploadImage, file);
   }

  // async searchBanner(request: BannerSearchRequest): Promise<any> {
  //   let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerSearch, request);
  //   let result = response.json() as any;
  //   return result;
  // }
  // async getBannerById(id: string): Promise<any> {
  //   var request = {
  //     id
  //   };
  //   let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerGet, request);
  //   let result = response.json() as any;
  //   return result;
  // }
  // async saveBanner(banner: Banner): Promise<any> {
  //   let url = "";
  //   if (banner.id != null && banner.id != undefined && banner.id.length > 0) {
  //     url = ConfigSetting.UrlPathBannerChange;
  //   }
  //   else {
  //     url = ConfigSetting.UrlPathBannerAdd;
  //   }
  //   var request = banner;
  //   let response = await this.httpClient.postJsonWithAuthen(url, request);
  //   let result = response.json() as any;
  //   return result;
  // }
   // async searchBannerItem(request: BannerItemSearchRequest): Promise<any> {
   //    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerItemSearch, request);
   //    let result = response.json() as any;
   //    return result;
   // }
  // async getBannerItemById(id: string, bannerId: string): Promise<any> {
  //   var request = {
  //     id,
  //     bannerId
  //   };
  //   let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerItemGet, request);
  //   let result = response.json() as any;
  //   return result;
  // }
  // async saveBannerItem(bannerItem: BannerItem): Promise<any> {
  //   var request = bannerItem;
  //   let url = '';
  //   if (request.id != null && request.id != undefined && request.id.length > 0) {
  //     url = ConfigSetting.UrlPathBannerItemChange;
  //   }
  //   else {
  //     url = ConfigSetting.UrlPathBannerItemAdd;
  //   }
  //   let response = await this.httpClient.postJsonWithAuthen(url, request);
  //   let result = response.json() as any;
  //   return result;
  // }
  // async removeBanner(id: string): Promise<any> {
  //   var request = {
  //     id
  //   };
  //   let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerRemove, request);
  //   let result = response.json() as any;
  //   return result;
  // }
  // async removeBannerItem(id: string, bannerId: string): Promise<any> {
  //   var request = {
  //     id: id,
  //     bannerId: bannerId
  //   };
  //   let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerItemRemove, request);
  //   let result = response.json() as any;
  //   return result;
  // }
}
