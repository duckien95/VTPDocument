import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ConfigSetting } from './configSetting';

@Injectable()
export class HttpClientService {
   // backendUrl = "http://localhost:3344/api/";
  constructor(
    private http: Http,
    private router: Router,
  ) { }

  cantNotConnectObject = {
    json: function () {
      return {
        status: false,
        messages: ['Can\'t connect to server']
      };
    }
  };
  unauthorizedObject = {
    json: function () {
      return {
        status: false,
        messages: ['Unauthorized']
      };
    }
  };

  private extractData(res: Response) {
    // debugger
    // let body = res.json();
    // return body || {};
    return res || {};
  }

  private handleError(error: any): Promise<any> {
    let errObject;
    switch (error.status) {
      case 0:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: ['Can\'t connect to server']
              };
            }
          };
          ConfigSetting.ShowError('Can\'t connect to server');
        }
        break;
      case 401:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: ['Unauthorized'],
                responseStatus: error.status,
              };
            }
          };
          ConfigSetting.ShowError('Unauthorized');
        }
        break;
      default:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: error.status + ':' + error.statusText
              };
            }
          };
          ConfigSetting.ShowError(error.status + ':' + error.statusText);
        }
        break;
    }
    return Promise.resolve(errObject);
  }

    postJsonObservable(relativePath, obj){
        const headers = ConfigSetting.Headers;
        // headers.set('token', localStorage.getItem('cms_token'));
        // headers.set('Access-Control-Allow-Origin', '*');
        // headers.set('Content-Type', 'application/json');
        // headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        // headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

        return this.http.post(ConfigSetting.BACKEND_API_URL + relativePath, obj, { headers: headers }).map( (data: Response) => {
            let result = JSON.parse(data["_body"]);
            // console.log(ConfigSetting.BACKEND_API_URL + relativePath,result);
            return result;
        }).catch( (error: any) => {
            let err = JSON.parse(error["_body"]);
            console.error(error);
            return Observable.of(err);
        });
    }

    uploadFile(relativePath, obj){
        const headers = ConfigSetting.Headers;
        // headers.set('Content-Type', 'charset=UTF-8');
        return this.http.post(ConfigSetting.BACKEND_API_URL + relativePath, obj, { headers: headers }).map( (data: Response) => {
            let result = JSON.parse(data["_body"]);
            // console.log(ConfigSetting.BACKEND_API_URL + relativePath,result);
            return result;
        }).catch( (error: any) => {
            let err = JSON.parse(error["_body"]);
            // console.error(ConfigSetting.BACKEND_API_URL + relativePath , error);
            return Observable.of(err);
        });
    }

    getJsonObservable(relativePath){
        const headers = ConfigSetting.Headers;
        // headers.set('token', localStorage.getItem('cms_token'));
        return this.http.get(ConfigSetting.BACKEND_API_URL + relativePath, { headers: headers }).map( (data: Response) => {
            let result = JSON.parse(data["_body"]);
            // console.log(ConfigSetting.BACKEND_API_URL + relativePath,result);
            return result;
        }).catch( (error: any) => {
            let err = JSON.parse(error["_body"]);
            // console.error(ConfigSetting.BACKEND_API_URL + relativePath , error);
            return Observable.of(err);
        });
    }

   postImage(relativePath, file){
      const headers = ConfigSetting.Headers;
      headers.set('token', localStorage.getItem('cms_token'));
      return this.http.post(ConfigSetting.BACKEND_API_URL + relativePath, file, { headers: headers }).map( (data: Response) => {
         let result = JSON.parse(data["_body"]);
         // console.log(ConfigSetting.BACKEND_API_URL + relativePath,result);
         return result;
      }).catch( (error: any) => {
         // console.error(ConfigSetting.BACKEND_API_URL + relativePath , error);
         // let errors = { error: true, message: 'Something went wrong' };
         return Observable.of(error);
      });
   }

   postMediaFile(relativePath, file){
      const headers = ConfigSetting.Headers;
      headers.set('token', localStorage.getItem('cms_token'));
      return this.http.post(ConfigSetting.BACKEND_API_URL + relativePath, file, { headers: headers }).map( (data: Response) => {
         let result = JSON.parse(data["_body"]);
         // console.log(ConfigSetting.BACKEND_API_URL + relativePath,result);
         return result;
      }).catch( (error: any) => {
         // console.error(ConfigSetting.BACKEND_API_URL + relativePath , error);
         // let errors = { error: true, message: 'Something went wrong' };
         return Observable.of(error);
      });
   }

  async postJson(absolutePath: string, obj): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const headers = ConfigSetting.Headers;
    try {
      let isError = false;
      const response = await this.http.post(url, obj, { headers: headers }).toPromise().then(this.extractData)
        .catch(err => {
          isError = true;
          return this.handleError(err);
        });
      if (isError) {
        const result = response.json() as any;
        if (result.responseStatus === 401) {
          await this.CheckLogin();
        }
      }
      return response || {};
    } catch (error) {
      ConfigSetting.ShowError('Can\'t connect to server');
    }
    return this.cantNotConnectObject;
  }
  async postJsonWithAuthen(absolutePath: string, obj): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const token: string = ConfigSetting.GetAuthenToken;
    const headers = ConfigSetting.Headers;
    headers.set('Authorization', `Bearer ${token}`);
    let isError = false;
    const response = await this.http.post(url, obj, { headers: headers }).toPromise().then(this.extractData)
      .catch(err => {
        isError = true;
        return this.handleError(err);
      });
    if (isError) {
      const result = response.json() as any;
      if (result.responseStatus === 401) {
        await this.CheckLogin();
      }
    }
    return response || {};
  }
  async postJsonWithAuthenAndHeaders(absolutePath: string, obj, headers): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const token: string = ConfigSetting.GetAuthenToken;
    headers.set('Authorization', `Bearer ${token}`);
    const response = await this.http.post(url, obj, { headers: headers }).toPromise().then(this.extractData)
      .catch(err => {
        return this.handleError(err);
      });
    return response || {};
  }
  async CheckLogin(): Promise<any> {
    const response = await this.postJsonWithAuthen(ConfigSetting.UrlPathCheckLogin, {});
    const result = response.json() as any;
    if (result.status) {
      ConfigSetting.ShowError('Permission deny.');
    } else {
      ConfigSetting.Logout();
      const currentUrl = this.router.url;
      this.router.navigate([ConfigSetting.LoginPage, currentUrl]);
    }

  }
}
