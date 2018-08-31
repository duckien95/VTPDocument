import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Jsonp } from '@angular/http/src/http';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';
import { BannerService } from '../../../../services/marketing-management/banner/banner.service';
import { Router } from '@angular/router';
import { BannerItem } from '../../../../models/marketing-management/banner/banner-item/banner-item';
import { Banner } from '../../../../models/marketing-management/banner/banner/banner';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-banner-item-add-or-change',
  templateUrl: './banner-item-add-or-change.component.html',
  styleUrls: ['./banner-item-add-or-change.component.css']
})
export class BannerItemAddOrChangeComponent implements OnInit {
  @Output() reloadBannerItemEvent = new EventEmitter();
  @ViewChild('bannerItemAddOrChange') bannerItemForm: any;
  configSetting = ConfigSetting;
  bannerId: string;
  bannerItemId: string;
  bannerItem: BannerItem;
  banner: Banner;
  // statuses: KeyValueModel[];
  statuses: any;
  submited: boolean;
  onGetDetailStatus: boolean;
  formValid: boolean;
  // minDate: string = new Date();
   constructor(
      private bannerService: BannerService,
      private router: Router,
      private cdRef:ChangeDetectorRef
   ) { }

   ngOnInit() {
      this.bannerItem = new BannerItem();
      this.banner = new Banner();
      this.formValid = true;
      this.submited = false;
      this.statuses = ConfigSetting.ListStatus;
      // if (jQuery().datetimepicker) {
      //    $('.datetimepicker1').datetimepicker();
      // }
   }

   ngAfterViewChecked() {
      // console.log( "! after view check");
      // console.log('startDate', this.bannerItem.startDate);
      this.cdRef.detectChanges();
   }

   initBannerItem(){
      this.formValid = true;
      this.bannerItemForm.reset();
      if(this.bannerItemId != '') {
         this.bannerService.getBannerItemById({ 'bannerItemId': this.bannerItemId, 'bannerId': this.bannerId }).subscribe( res => {
            console.log(res);
            if(!res.error){
               this.banner = res.banner;
               this.bannerItem =  res.bannerItem;
            } else {
               // this.banner = [];
               // this.bannerItem = [];
               ConfigSetting.ShowError("Can not get baner and banner item");
            }

         })
      } else {
         this.bannerService.getBannerById({ 'bannerId': this.bannerId }).subscribe( res => {
            this.banner = res.error ? [] : res.data;
         });
         this.bannerItem = new BannerItem();
      }

   }


  // async onGetDetail(): Promise<boolean> {
  //   if (this.onGetDetailStatus) {
  //     ConfigSetting.ShowWaiting();
  //     return;
  //   }
  //   this.onGetDetailStatus = true;
  //   App.blockUI();
  //   try {
  //     let response = await this.bannerService.getBannerItemById(this.bannerItemId, this.bannerId);
  //     if (response.status) {
  //       this.bannerItem = response.bannerItem;
  //       this.banner = response.banner;
  //       this.statuses = response.statuses;
  //       return true;
  //     } else {
  //       ConfigSetting.ShowErrores(response.messages);
  //     }
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   finally {
  //     this.onGetDetailStatus = false;
  //     App.unblockUI();
  //   }
  //   return false;
  // }

   reloadAndReset() {
      this.bannerItemForm.reset();
      this.reloadBannerItemEvent.emit();
      $('#banner-item-add-or-change').modal('hide');
   }

   onAddOrChange(form) {
      this.formValid = form.valid;
      if(form.valid && this.bannerItem.imageUrl != undefined) {
         let requestModel = this.bannerItem;
         if (requestModel.isDefault) {
            requestModel.startDate = "";
            requestModel.endDate = "";
         }
         if(this.bannerItemId){
            this.bannerService.updateBannerItem(requestModel).subscribe( res => {
               // console.log(res);
               if(!res.error) {
                  ConfigSetting.ShowSuccess('Update banner item sucess.');
                  this.reloadAndReset();
               } else {
                  ConfigSetting.ShowError(res.message);
               }
            })
         } else {
            requestModel.bannerId = this.bannerId;
            this.bannerService.createBannerItem(requestModel).subscribe( res => {
               if(!res.error) {
                  ConfigSetting.ShowSuccess('Create banner item sucess.');
                  this.reloadAndReset();
               } else {
                  ConfigSetting.ShowError(res.message);
               }
            })
         }

      } else {
         ConfigSetting.ShowError("Can not update or create banner item");
      }
   }
  // async onAddOrChange(form): Promise<void> {
  //   if (this.submited) {
  //     ConfigSetting.ShowWaiting();
  //     return;
  //   }
  //   App.blockUI();
  //   this.submited = true;
  //   try {
  //     if (form.valid) {
  //       let requestModel = this.bannerItem;
  //       if (requestModel.isDefault) {
  //         requestModel.startDate = "";
  //         requestModel.endDate = "";
  //       }
  //       else {
  //         requestModel.startDate = $("input[name='startDate']").val();
  //         requestModel.endDate = $("input[name='endDate']").val();
  //       }
  //
  //       let response = await this.bannerService.saveBannerItem(requestModel);
  //       if (response.status) {
  //         $('#banner-item-add-or-change').modal('hide');
  //         ConfigSetting.ShowSuccess('Save sucess.');
  //         this.reloadBannerItemEvent.emit();
  //       } else {
  //         ConfigSetting.ShowErrores(response.messages);
  //       }
  //     }
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   finally {
  //     App.unblockUI();
  //     this.submited = false;
  //   }
  //
  // }
   onFileChange(event) {
      var files = event.target.files;
      if(files.length){
         let form_data: FormData  = new FormData();
         form_data.append('file', files[0]);
         this.bannerService.saveBannerItemImage(form_data).subscribe( res => {
            console.log(res);
            if(res.error){
               ConfigSetting.ShowError(res.message)
            } else {
               ConfigSetting.ShowSuccess("Upload Image Success");
               this.bannerItem.imageUrl = res.filename;
            }
         })
      }
   }

   getURLImage(img_file_name) {
      return img_file_name != undefined ? `${ConfigSetting.BACKEND_URL}/images/${img_file_name}` : '';
   }
  // async onChangeImage(): Promise<void> {
  //   App.blockUI();
  //   try {
  //     $('#file-uploader-popup').modal('show');
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   App.unblockUI();
  // }

  // async getUploadedFile($event): Promise<void> {
  //   try {
  //     this.bannerItem.imageUrl = ConfigSetting.CDN_URL + $event;
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   App.unblockUI();
  // }
   onSelectedCheckbox() {
      $('input[name=\'startDate\']').val('');
      $('input[name=\'endDate\']').val('');
   }
  // async onSelectedCheckbox(): Promise<void> {
  //   try {
  //     $('input[name=\'startDate\']').val('');
  //     $('input[name=\'endDate\']').val('');
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  // }

}
