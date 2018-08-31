import { NgModule } from '@angular/core';

import { EqualValidator } from './directives/equal-validator.directive';
import { Convert } from './common/convert';
import { ConfigSetting } from './common/configSetting';
import { HttpClientService } from './common/http-client.service';

import { CheckPermissionService } from './services/check-permission.service';
import { GrantPermissionService } from './services/grant-permission.service';
import { LoginRedirectService } from './services/login-redirect.service';
import { AccountService } from './services/account.service';
import { MenuService } from './services/menu.service';
import { FileService } from './services/file.service';
import { TemplateService } from './services/marketing-management/page-builder/template.service';
import { BannerService } from './services/marketing-management/banner/banner.service';
import { EmailOrSmsService } from './services/email-or-sms.service';
import { VtpService } from './services/marketing-management/vtp.service';
import { PostService } from './services/marketing-management/post.service';
import { RadioService } from './services/marketing-management/radio.service';
import { NoteService } from './services/marketing-management/note.service';
import { VtpEmployeeService } from './services/vtp-employee.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TemplateDefineService } from './services/marketing-management/template-define.service';
import { DocumentService } from './services/document-management/document.service';
// import { WarehouseVendorService } from './services/warehouse-vendor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule
  ],
  providers: [
    HttpClientService,
    CheckPermissionService,
    LoginRedirectService,
    AccountService,
    BannerService,
    VtpService,
    PostService,
    RadioService,
    NoteService,
    VtpEmployeeService,
    GrantPermissionService,
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
