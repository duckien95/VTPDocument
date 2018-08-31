import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';

import { ResultModel } from '../models/result-model';
import { Dictionary } from '../models/dictionary';

@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClientService, private http: Http) { }


    setHeader(){
        let header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE');
        header.append('Access-Control-Allow-Headers', 'Content-type');
        header.append('Content-Type', 'application/json');
        let requestOptions = new RequestOptions();
        requestOptions.headers = header;
        return requestOptions;
    }

  async login(email: string, password: string, remember: boolean): Promise<any> {
    let request = {
      email,
      password,
      remember
    }
    let response = await this.httpClient.postJson(ConfigSetting.UrlPathLogin, request);
    let result = response.json() as any;
    if (result.status) {
      let actionIds = new Dictionary<boolean>();
      if (!result.isAdministrator) {
        if (result.actionIds != null && result.actionIds != undefined && result.actionIds.length > 0) {
          for (let i = 0; i < result.actionIds.length; i++) {
            actionIds.Add(result.actionIds[i], true);
          }
        }
      }
      ConfigSetting.SetLoginStatus(result.tokenKey, result.isAdministrator, actionIds);
      ConfigSetting.ShowSuccess('Login success.');
    }
    else {
      ConfigSetting.ShowErrores(result.messages);
    }
    return result;
  }

   loginSystem(username, password){
      // let obj = { "username": username, "password": password };
      let obj = { "appId": username, "secretKey": password };
      return this.httpClient.postJsonObservable('auth/gettoken', obj);
   }
  async register(fullName: string, email: string, password: string, confirmPassword: string): Promise<any> {
    const request = {
      fullName,
      email,
      password,
      confirmPassword
    }
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathRegister, request);
    const result = response.json() as any;
    if (result.status) {
      ConfigSetting.SetLoginStatus(result.TokenKey, null, null);
      ConfigSetting.ShowSuccess('Register success.');
    }
    else {
      ConfigSetting.ShowErrores(result.messages);
    }
    return result;
  }
}
