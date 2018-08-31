import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';


@Injectable()
export class GrantPermissionService implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (ConfigSetting.GetLoginStatus()) {
        if(localStorage.getItem('cms_app_id') == "daotaotruyenthong"){
            return true;
        }

        return false;
    } else {
      // ConfigSetting.Logout();
      // const currentUrl = state.url;
      // this.router.navigate([ConfigSetting.LoginPage, currentUrl]);
      ConfigSetting.logoutSystem();
      this.router.navigateByUrl(ConfigSetting.LoginPage);
      return false;
    }
  }
}
