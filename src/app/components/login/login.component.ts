import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ConfigSetting } from '../../common/configSetting';

import { LoginModel } from '../../models/login-model';
import { promise } from 'selenium-webdriver';
declare var App: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel;
  returnUrl: string;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute,
  ) {
    this.returnUrl = '';
    this.route.params.subscribe(params => {
      this.returnUrl = params.returnUrl;
    });
  }

  ngOnInit() {
    this.model = new LoginModel();
    this.model.email = '';
    this.model.password = '';
  }

  async onInit(): Promise<void> {
    try {

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
  }

  // async onLogin(loginForm): Promise<void> {
  //   App.blockUI();
  //   try {
  //     if (loginForm.valid) {
  //       const response = await this.accountService.login(this.model.email, this.model.password, this.model.remember);
  //       this.model.message = response.messages.join();
  //       if (response.status) {
  //         if (this.returnUrl === '' || this.returnUrl === undefined) {
  //           this.router.navigateByUrl(ConfigSetting.HomePage);
  //         } else {
  //           this.router.navigateByUrl(this.returnUrl);
  //         }
  //
  //       }
  //       const response = await this.accountService.login(this.model.email, this.model.password, this.model.remember);
  //       this.model.message = response.messages.join();
  //
  //       if (response.status) {
  //         if (this.returnUrl === '' || this.returnUrl === undefined) {
  //           this.router.navigateByUrl(ConfigSetting.HomePage);
  //         } else {
  //           this.router.navigateByUrl(this.returnUrl);
  //         }
  //
  //       }
  //     }
  //
  //   } catch (error) {
  //     ConfigSetting.ShowErrorException(error);
  //   }
  //   App.unblockUI();
  // }
  async onLogin(loginForm): Promise<void> {
    App.blockUI();
    try {
      if (loginForm.valid) {
        const response = await this.accountService.login(this.model.email, this.model.password, this.model.remember);
        this.model.message = response.messages.join();
        if (response.status) {
          if (this.returnUrl === '' || this.returnUrl === undefined) {
            this.router.navigateByUrl(ConfigSetting.HomePage);
          } else {
            this.router.navigateByUrl(this.returnUrl);
          }

        }

      }

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    App.unblockUI();
  }

  // login by AppId
   onLoginForm(loginForm){
      try {
         if (loginForm.valid) {
            this.accountService.loginSystem(this.model.email, this.model.password).subscribe( res => {
               console.log(res);
               if(res.auth){
                  localStorage.setItem('cms_token', res.token);
                  localStorage.setItem('cms_app_id', res.appId);
                  localStorage.setItem('cms_expire_time', JSON.stringify(Date.now() + 86400000)) //one day
                  ConfigSetting.ShowSuccess('Login success');
                  if(res.appId == "daotaotruyenthong") {
                      this.router.navigate(['/g/radios']);
                  } else this.router.navigate(['/g/services']);

               }
               else {
                  ConfigSetting.ShowError(res.message);
                  this.router.navigate(['/login']);
               }
            })
         } else {
            ConfigSetting.ShowError('Can not submit form');
         }
      } catch (error) {
         console.log('err');
         ConfigSetting.ShowErrorException(error);
      }
   }

}
