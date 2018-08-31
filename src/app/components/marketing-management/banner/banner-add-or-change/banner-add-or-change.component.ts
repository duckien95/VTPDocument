
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Jsonp } from '@angular/http/src/http';
import { ConfigSetting } from '../../../../common/configSetting';
import { BannerSearchRequest } from '../../../../models/marketing-management/banner/banner/banner-search-request';
import { KeyValueModel } from '../../../../models/result-model';
import { BannerService } from '../../../../services/marketing-management/banner/banner.service';
import { Router } from '@angular/router';
import { Banner } from '../../../../models/marketing-management/banner/banner/banner';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-banner-add-or-change',
  templateUrl: './banner-add-or-change.component.html',
  styleUrls: ['./banner-add-or-change.component.css']
})

export class BannerAddOrChangeComponent implements OnInit {
  @Input() bannerId: number;
  @Output() reloadBannerEvent = new EventEmitter();
  @ViewChild('bannerAddOrChange') bannerAddOrChangeForm: any;
  banner: Banner;
  // statuses: KeyValueModel[];
  statuses: any;
  pageTypes: KeyValueModel[];
  onGetDetailStatus: boolean;
  onAddOrChangeStatus: boolean;
  formValid: boolean;
  constructor(
    private bannerService: BannerService,
    private router: Router
  ) { }


  ngOnInit() {
    this.banner = new Banner();
    this.formValid = true;
    this.statuses = ConfigSetting.ListStatus;
    // if (jQuery().datepicker) {
    //   $('.date-picker').datepicker({
    //     rtl: App.isRTL(),
    //     orientation: 'left',
    //     autoclose: true
    //   });
    //   $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
    // }
  }

   initBanner() {
      this.formValid = true;
      this.bannerAddOrChangeForm.reset();
      if(this.banner._id == '') {
         this.banner = new Banner();
      } else {
         this.bannerService.getBannerById({'bannerId': this.banner._id}).subscribe( res => {
            this.banner = res.error ? [] : res.data;
         })
      }

   }

   reloadAndReset() {
      this.bannerAddOrChangeForm.reset();
      this.reloadBannerEvent.emit();
      $('#banner-add-or-change').modal('hide');
   }

   onAddOrChange(form){
      this.formValid = form.valid;
      if(this.formValid){
         const requestModel = this.banner;
         if(this.banner._id != undefined) {
            this.bannerService.updateBanner(requestModel).subscribe( res => {
               console.log(res);
               if(!res.error){
                  ConfigSetting.ShowSuccess('Save banner sucess');
                  this.reloadAndReset();
               }
               else {
                  ConfigSetting.ShowErrores(res.message);
               }
            })
         }
         else {
            this.bannerService.createBanner(requestModel).subscribe( res => {
               console.log(res);
               if(!res.error){
                  ConfigSetting.ShowSuccess('Create banner sucess');
                  this.reloadAndReset();
               }
               else {
                  ConfigSetting.ShowErrores(res.message);
               }
            })
         }

      }
   }

  // async onGetDetail(): Promise<void> {
  //   if (this.onGetDetailStatus) {
  //     ConfigSetting.ShowWaiting();
  //     return;
  //   }
  //   App.blockUI();
  //   this.onGetDetailStatus = true;
  //   try {
  //     const response = await this.bannerService.getBannerById(this.banner.id);
  //     if (response.status) {
  //       this.banner = response.banner;
  //       this.statuses = response.statuses;
  //       this.pageTypes = response.pageTypes;
  //     }
  //     else {
  //       ConfigSetting.ShowErrores(response.messages);
  //     }
  //
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   finally {
  //     this.onGetDetailStatus = false;
  //     App.unblockUI();
  //   }
  // }

  // async onAddOrChange(form): Promise<void> {
  //   if (this.onAddOrChangeStatus) {
  //     ConfigSetting.ShowWaiting();
  //     return;
  //   }
  //   App.blockUI();
  //   try {
  //     this.formValid = form.valid;
  //     if (this.formValid) {
  //       const requestModel = this.banner;
  //       const response = await this.bannerService.saveBanner(requestModel);
  //       if (response.status) {
  //         ConfigSetting.ShowSuccess('Save sucess.');
  //         $('#banner-add-or-change').modal('hide');
  //         this.reloadBannerEvent.emit();
  //       } else {
  //         ConfigSetting.ShowErrores(response.messages);
  //       }
  //     }
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   finally {
  //     this.onAddOrChangeStatus = false;
  //     App.unblockUI();
  //   }
  // }
}
