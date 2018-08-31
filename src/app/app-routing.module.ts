import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EqualValidator } from './directives/equal-validator.directive';
import { AutoCompleteModule } from 'primeng/primeng';

import { CheckPermissionService } from './services/check-permission.service';
import { GrantPermissionService } from './services/grant-permission.service';
import { LoginRedirectService } from './services/login-redirect.service';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ValidatePasswordDirective } from './directives/validate-password.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MultipleFileUploadComponent } from './components/multiple-file-upload/multiple-file-upload.component';
import { BaseComponent } from './components/base/base.component';

import { FileUploadModule } from 'primeng/fileupload';
import { CKEditorModule } from 'ng2-ckeditor';

import { BannerComponent } from './components/marketing-management/banner/banner/banner.component';
import { BannerItemComponent } from './components/marketing-management/banner/banner-item/banner-item.component';
import { BannerAddOrChangeComponent } from './components/marketing-management/banner/banner-add-or-change/banner-add-or-change.component';
import { BannerItemAddOrChangeComponent } from './components/marketing-management/banner/banner-item-add-or-change/banner-item-add-or-change.component';
import { CustomFormsModule } from 'ng2-validation';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';

import { VtpServiceComponent } from './components/marketing-management/vtp-service/vtp-service.component';
import { ValidateNumberDirective } from './directives/validate-number.directive';
import { VtpChildServiceComponent } from './components/marketing-management/vtp-child-service/vtp-child-service.component';
import { VtpServiceAddOrChangeComponent } from './components/marketing-management/vtp-service-add-or-change/vtp-service-add-or-change.component';
import { PostComponent } from './components/marketing-management/post/post.component';
import { PostAddOrChangeComponent } from './components/marketing-management/post-add-or-change/post-add-or-change.component'
import { RadioComponent } from './components/marketing-management/radio/radio.component';
import { RadioAddOrChangeComponent } from './components/marketing-management/radio-add-or-change/radio-add-or-change.component';
import { RadioScheduleComponent } from './components/marketing-management/radio-schedule/radio-schedule.component';
import { RadioScheduleAddOrChangeComponent } from './components/marketing-management/radio-schedule-add-or-change/radio-schedule-add-or-change.component';
import { OfferPriceComponent } from './components/marketing-management/offer-price/offer-price.component';
import { OfferPriceUpdateComponent } from './components/marketing-management/offer-price-update/offer-price-update.component';
import { RegisterAgencyComponent } from './components/marketing-management/register-agency/register-agency.component';
import { RegisterAgencyUpdateComponent } from './components/marketing-management/register-agency-update/register-agency-update.component';
import { ConsultComponent } from './components/marketing-management/consult/consult.component';
import { ConsultUpdateComponent } from './components/marketing-management/consult-update/consult-update.component';
import { VtpEmployeeComponent } from './components/vtp-employee/vtp-employee.component';
import { VtpEmployeeChangeComponent } from './components/vtp-employee/vtp-employee-change/vtp-employee-change.component';

import { SearchDocumentComponent } from './components/docs-management/search-document/search-document.component';
import { InsertDocumentComponent } from './components/docs-management/insert-document/insert-document.component';
import { SuggestTagComponent } from './components/docs-management/suggest-tag/suggest-tag.component';
import { SuggestTitleComponent } from './components/docs-management/suggest-title/suggest-title.component';
import { TreeViewComponent } from "./components/docs-management/tree-view/tree-view.component";

const routesConfig: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'login/:returnUrl',
    component: LoginComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'document',
    component: LayoutComponent,
    // canActivate: [CheckPermissionService],
    children: [
        {
          path: 'search',
          component: SearchDocumentComponent
        },
        {
          path: 'insert',
          component: InsertDocumentComponent
        }
    ]
  },
  {
    path: 'g',
    component: LayoutComponent,
    canActivate: [CheckPermissionService],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        // canActivate: [CheckPermissionService]
      },
      {
        path: 'banner',
        component: BannerComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'banner-item/:bannerId',
        component: BannerItemComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'admin-menu',
        component: AdminMenuComponent,
        // canActivate: [CheckPermissionService]
      },
      {
        path: 'services',
        component: VtpServiceComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'posts',
        component: PostComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'radios',
        component: RadioComponent,
        canActivate: [GrantPermissionService]
      },
      {
        path: 'radio-schedule/:radioId',
        component: RadioScheduleComponent,
        canActivate: [CheckPermissionService]
     },
     {
      path: 'offer-price',
      component: OfferPriceComponent,
      canActivate: [CheckPermissionService]
     },
     {
      path: 'consult-service',
      component: ConsultComponent,
      canActivate: [CheckPermissionService]
     },
     {
     path: 'register-agency',
     component: RegisterAgencyComponent,
     canActivate: [CheckPermissionService]
  },
     {
    path: 'list-employee',
    component: VtpEmployeeComponent,
    canActivate: [CheckPermissionService]
    }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    EqualValidator,
    LayoutComponent,
    ValidatePasswordDirective,
    FileUploadComponent,
    MultipleFileUploadComponent,
    BaseComponent,
    BannerComponent,
    BannerItemComponent,
    BannerAddOrChangeComponent,
    BannerItemAddOrChangeComponent,
    AdminMenuComponent,
    VtpServiceComponent,
    VtpServiceAddOrChangeComponent,
    PostComponent,
    PostAddOrChangeComponent,
    RadioComponent,
    RadioAddOrChangeComponent,
    RadioScheduleComponent,
    RadioScheduleAddOrChangeComponent,
    OfferPriceComponent,
    OfferPriceUpdateComponent,
    RegisterAgencyComponent,
    RegisterAgencyUpdateComponent,
    ConsultComponent,
    ConsultUpdateComponent,
    VtpEmployeeComponent,
    VtpEmployeeChangeComponent,
    VtpChildServiceComponent,
    ValidateNumberDirective,
    SearchDocumentComponent,
    InsertDocumentComponent,
    SuggestTagComponent,
    SuggestTitleComponent,
    TreeViewComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routesConfig),
    NgxPaginationModule,
    CKEditorModule,
    NgbModule.forRoot(),
    FileUploadModule,
    AutoCompleteModule,
    CustomFormsModule,
    MyDateRangePickerModule,
    MyDatePickerModule,
    TextMaskModule
  ],
  exports: [
    RouterModule,
    EqualValidator
  ]
})

export class AppRoutingModule {

}
