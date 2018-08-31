import { Component, OnInit, ViewChild } from '@angular/core';
import { VtpService } from '../../../services/marketing-management/vtp.service';
import { ServiceSearch } from '../../../models/marketing-management/search-model';
import { VtpServiceAddOrChangeComponent } from '../vtp-service-add-or-change/vtp-service-add-or-change.component';
import { ConfigSetting } from '../../../common/configSetting';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-vtp-service',
  templateUrl: './vtp-service.component.html',
  styleUrls: ['./vtp-service.component.css'],
  providers: [ VtpService ]
})
export class VtpServiceComponent implements OnInit {

   @ViewChild(VtpServiceAddOrChangeComponent) vtpServiceAddOrChange: VtpServiceAddOrChangeComponent;
   searchParams: ServiceSearch;
   statuses: any;
   ListService: any = [];
   ListChildService: any = [];
   pageSize: number =  24;
   pageIndex:number = 0;
   highlightServiceId: string;
   msg: string;

   constructor(
      private vtpService : VtpService
   ) { }

   ngOnInit() {
      this.searchParams = new ServiceSearch();
      this.statuses = ConfigSetting.ListStatusSearch;
      this.loadListService();
   }

   searchService() {
      this.msg = '';
      var requestModel =  this.searchParams;
      this.vtpService.searchService(requestModel).subscribe( res => {
         if(!res.error && res.data.length){
            this.ListService =  res.data;
         } else {
            this.ListService = [];
         }
      })
   }

   getListChildService(serviceId){
      console.log(serviceId);
      if(this.highlightServiceId == serviceId) {
         this.highlightServiceId = '';
      }
      else {
         // console.log($(`#${serviceId}`);

         this.highlightServiceId = serviceId;
         this.vtpService.getListChildService({ 'parentServiceId': serviceId }).subscribe( res => {
            // console.log('child_service', res.data);
            this.ListChildService = res.error ? [] : res.data;
         })
      }

   }

   loadListService(){
      this.vtpService.getListParentService().subscribe( res => {
         console.log('list_service', res);
         this.ListService = res.error ? [] : res.data
      })
   }

   onShowAddService(){
      this.vtpServiceAddOrChange.vtpServiceModel.serviceId = undefined;
      this.vtpServiceAddOrChange.initVtpServiceModel();
      $('#vtp-service-add-or-change').modal('show');
      console.log('click add service')
   }

   deleteService(id){
      this.vtpService.deleteService({ "serviceId": id}).subscribe( res => {
         if(res.error){
            ConfigSetting.ShowError(res.message);
         }
         else {
            ConfigSetting.ShowSuccess("Delete service success");
            this.highlightServiceId = '';
            this.loadListService();
            // this.initVtpServiceModel();
         }
      })
   }

   onShowUpdateService(id){
      // console.log("vtp service model",this.vtpServiceAddOrChange.vtpServiceModel);
      this.vtpServiceAddOrChange.vtpServiceModel.serviceId = id;
      this.vtpServiceAddOrChange.initVtpServiceModel();
      $('#vtp-service-add-or-change').modal('show');
   }

   public onRegisterConfirmation() {
      const obj = $('.service_remove_bs_confirmation');
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
         const id = $(this).attr('tmpid');
         // console.log(id);
         $that.deleteService(id);
      });
   }

   public onChildRegisterConfirmation() {
      const obj = $('.child_service_remove_bs_confirmation');
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
         const id = $(this).attr('tmpid');
         // console.log(id);
         $that.deleteService(id);
      });
   }

}
