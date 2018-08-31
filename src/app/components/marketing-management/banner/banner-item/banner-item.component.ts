import { Component, OnInit, ViewChild } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { BannerService } from '../../../../services/marketing-management/banner/banner.service';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ConfigSetting } from '../../../../common/configSetting';
import { Banner } from '../../../../models/marketing-management/banner/banner/banner';
import { KeyValueModel } from '../../../../models/result-model';
import { BannerItemSearchRequest } from '../../../../models/marketing-management/banner/banner-item/banner-item-search-request';
import { BannerItemSearch } from '../../../../models/marketing-management/search-model';
import { BannerItem } from '../../../../models/marketing-management/banner/banner-item/banner-item';
import { promise } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { BannerItemAddOrChangeComponent } from '../banner-item-add-or-change/banner-item-add-or-change.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-banner-item',
  templateUrl: './banner-item.component.html',
  styleUrls: ['./banner-item.component.css']
})
export class BannerItemComponent implements OnInit {
  @ViewChild(BannerItemAddOrChangeComponent) bannerItemAddOrChange: BannerItemAddOrChangeComponent;
  @ViewChild('searchForm') searchForm: any;
  // searchParams: BannerItemSearchRequest;
  searchParams: BannerItemSearch;
  banner: Banner;
  // statuses: KeyValueModel[];

  configSetting = ConfigSetting;
  statuses: any;
  currentBannerId: string;
  bannerItems: BannerItem[];
  currentBannerItemId: string;
  totalRow = 0;
  pageSize:number = 24;
  pageIndex: number = 0;
  onDeleteStatus: boolean;
  msg: string = '';

  today = new Date().toJSON().split('T')[0];
  constructor(private bannerService: BannerService,
    private router: ActivatedRoute) {
  }


  ngOnInit() {
    // if (jQuery().datepicker) {
    //   $('.date-picker').datepicker({
    //     rtl: App.isRTL(),
    //     orientation: 'left',
    //     autoclose: true
    //   });
    //   $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
    // }
    // this.searchParams = new BannerItemSearchRequest();
    this.searchParams = new BannerItemSearch();
    this.searchParams.status = 0;
    // this.searchParams.pageIndex = 0;
    // this.searchParams.pageSize = 30;
    this.statuses = ConfigSetting.ListStatusSearch;
    this.banner = new Banner();
    this.router.paramMap.subscribe((param: ParamMap) => {
      // console.log(param);
      this.currentBannerId = param.get('bannerId');
    });
    // this.searchParams.bannerId = this.currentBannerId;
    this.getBannerItems();
  }

   getBannerItems(){
      // this.searchParams.fromStartDate = $('input[name=\'fromStartDate\']').val();
      // this.searchParams.toStartDate = $('input[name=\'toStartDate\']').val();
      // this.searchParams.fromEndDate = $('input[name=\'fromEndDate\']').val();
      // this.searchParams.toEndDate = $('input[name=\'toEndDate\']').val();
      this.bannerService.getChildBannerItem({'bannerId' : this.currentBannerId }).subscribe( res => {
         // console.log(res);
         this.bannerItems = res.error ? [] : res.data;
      });

      this.bannerService.getBannerById({ 'bannerId': this.currentBannerId }).subscribe( res => {
         this.banner = res.error ? [] : res.data;
      })

   }

   searchBannerItem(){
      this.msg = '';
      this.searchParams.bannerId = this.currentBannerId;
      this.bannerService.searchBannerItem(this.searchParams).subscribe( res => {
         if(!res.error && res.data.length){
            this.bannerItems = res.data;
         }  else {
            this.bannerItems = [];
         }

      })
   }

   // getURLImage(img_file_name) {
   //    return ConfigSetting.getMediaURL(img_file_name);
   // }

  // async getBannerItems(): Promise<void> {
  //   if (this.searchForm.valid) {
  //     try {
  //       this.searchParams.fromStartDate = $('input[name=\'fromStartDate\']').val();
  //       this.searchParams.toStartDate = $('input[name=\'toStartDate\']').val();
  //       this.searchParams.fromEndDate = $('input[name=\'fromEndDate\']').val();
  //       this.searchParams.toEndDate = $('input[name=\'toEndDate\']').val();
  //       const response = await this.bannerService.searchBannerItem(this.searchParams);
  //       // debugger;
  //       this.statuses = response.statuses;
  //       this.bannerItems = response.bannerItems;
  //       this.banner = response.banner;
  //       this.totalRow = response.totalRow;
  //       if (this.banner.id == null || this.banner.id === '') {
  //         ConfigSetting.ShowError('Banner not found!!!');
  //       }
  //     } catch (ex) {
  //       ConfigSetting.ShowErrorException(ex);
  //     }
  //   }
  //
  // }

   onShowAddOrChangeForm(id: string){
      this.currentBannerItemId = id;
      this.bannerItemAddOrChange.bannerItemId = id;
      this.bannerItemAddOrChange.bannerId = this.currentBannerId;
      this.bannerItemAddOrChange.initBannerItem();

      $('#banner-item-add-or-change').modal('show');
   }

  // async onShowAddOrChangeForm(id: string): Promise<void> {
  //   try {
  //     //debugger
  //     this.currentBannerItemId = id;
  //     this.bannerItemAddOrChange.bannerItemId = id;
  //     this.bannerItemAddOrChange.bannerId = this.currentBannerId;
  //     $('#banner-item-add-or-change').modal('show');
  //     // var result = await this.bannerItemAddOrChange.onGetDetail();
  //     // if (result) {
  //     //   $('#banner-item-add-or-change').modal('show');
  //     // }
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  // }
  public onRegisterConfirmation() {
    const obj = $('.banneritem_remove_bs_confirmation');
    const register = obj.attr('confirmation_register');
    if (register === '1') {
      return;
    }
    obj.attr('confirmation_register', '1');
    obj.confirmation({
      rootSelector: '[data-toggle=confirmation]'
    });
    const $that = this;
    obj.on('confirmed.bs.confirmation', function () {
      console.log(this);
      const id = $(this).attr('tmpid');
      $that.onDelete(id);
    });
  }

   onDelete(id: string) {
     this.bannerService.deleteBannerItem({ 'bannerItemId': id }).subscribe( res => {
        if(!res.error) {
           ConfigSetting.ShowSuccess('Remove banner item success');
           this.getBannerItems();
        } else {
           ConfigSetting.ShowError(res.message);
        }
     })
   }
  // async onDelete(id: string): Promise<void> {
  //   if (this.onDeleteStatus) {
  //     ConfigSetting.ShowWaiting();
  //     return;
  //   }
  //   App.blockUI();
  //   this.onDeleteStatus = true;
  //   try {
  //     const response = await this.bannerService.removeBannerItem(id, this.currentBannerId);
  //     if (response.status) {
  //       ConfigSetting.ShowSuccess('Save sucess.');
  //       this.getBannerItems();
  //     } else {
  //       ConfigSetting.ShowErrores(response.messages);
  //     }
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   this.onDeleteStatus = false;
  //   App.unblockUI();
  // }

}
