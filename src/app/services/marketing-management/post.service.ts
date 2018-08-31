import { Injectable } from '@angular/core';
import { PostModel } from '../../models/marketing-management/post/post-model';
import { ConfigSetting } from '../../common/configSetting';
import { HttpClientService } from '../../common/http-client.service';

@Injectable()
export class PostService {

   constructor(
      private httpClient: HttpClientService
   ) { }

   searchPost(obj) {
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathPostSearch, obj);
   }

   getListPost(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathPostGet, obj);
   }

   createPost(obj){
      console.log(obj);
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathPostCreate, obj);
   }

   updatePost(obj){
      console.log('update post');
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathPostUpdate, obj);
   }

   deletePost(obj){
      return this.httpClient.postJsonObservable(ConfigSetting.UrlPathPostDelete, obj);
   }

   saveThumbnailImage(file){
      return this.httpClient.postImage(ConfigSetting.UrlPathWebUploadImage, file);
   }
}
