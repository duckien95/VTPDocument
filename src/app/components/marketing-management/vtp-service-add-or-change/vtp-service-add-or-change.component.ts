import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { VtpService } from '../../../services/marketing-management/vtp.service';
import { VtpServiceModel } from '../../../models/marketing-management/services/vtp-service-model';
import { ConfigSetting } from '../../../common/configSetting';

declare var $: any;

@Component({
  selector: 'app-vtp-service-add-or-change',
  templateUrl: './vtp-service-add-or-change.component.html',
  styleUrls: ['./vtp-service-add-or-change.component.css']
})
export class VtpServiceAddOrChangeComponent implements OnInit {
   @Output() reloadServiceEvent = new EventEmitter();
   @Output() resetHighlightServiceId = new EventEmitter();
   @ViewChild('vtpServiceAddOrChange') vtpServiceForm: any;
   vtpServiceModel: VtpServiceModel;
   ListParentService: any = [];
   ListServiceStatus: any = [];
   formValid: boolean;
   msg: string;
   constructor(
      private vtpService: VtpService
   ) { }

   ngOnInit() {
      this.vtpServiceModel = new VtpServiceModel();
      // console.log('vtpServiceModel start');
      // console.log(this.vtpServiceModel.serviceId);
      this.initVtpServiceModel();

   }

   initVtpServiceModel(){
      // console.log('init add or change', this.vtpServiceModel.serviceId )
      this.formValid = true;
      this.vtpServiceForm.reset();
      this.ListServiceStatus = ConfigSetting.ListStatus;
      this.vtpService.getListParentService().subscribe( res => {
         // console.log(res);
         this.ListParentService = res.error ? [] :  res.data;
      })
      if(this.vtpServiceModel.serviceId != undefined){
         this.vtpService.getListService({ "serviceId": this.vtpServiceModel.serviceId }).subscribe( res => {
            console.log('service_detail',res.data[0]);
            console.log(res.data.length > 0);
            if(!res.error && res.data.length > 0){
               this.vtpServiceModel = res.data[0];
               this.vtpServiceModel.serviceId = res.data[0]._id;
            }
         })
      }
      else {
         this.vtpServiceModel = new VtpServiceModel();
         this.vtpServiceModel.parentId = "0";
         // this.vtpServiceModel.status = 0;
      }

   }

   reloadAndReset(){
      this.reloadServiceEvent.emit();
      this.resetHighlightServiceId.emit();
      this.vtpServiceForm.reset();
      // this.initVtpServiceModel();
      $('#vtp-service-add-or-change').modal('hide');
   }

   onAddOrChange(form){
      // console.log(form);
      this.formValid = form.valid;
      if(this.formValid){
         console.log(this.vtpServiceModel.serviceId);
         if(this.vtpServiceModel.serviceId == undefined){
            this.vtpService.createService(this.vtpServiceModel).subscribe( res => {
               if(res.error){
                  ConfigSetting.ShowError(res.message)
               }
               else {
                  ConfigSetting.ShowSuccess("Create service success");
                  this.reloadAndReset();

               }
            })
         }
         else {
            this.vtpService.updateService(this.vtpServiceModel).subscribe( res => {
               if(res.error){
                  ConfigSetting.ShowError(res.message)
               }
               else {
                  ConfigSetting.ShowSuccess("Update service success");
                  this.reloadAndReset();
               }
            })
         }

      }
      else {
         ConfigSetting.ShowError("Can not create or update service");
      }

   }

}
