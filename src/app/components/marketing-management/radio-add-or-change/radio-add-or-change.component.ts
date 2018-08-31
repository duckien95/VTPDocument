import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { RadioService } from '../../../services/marketing-management/radio.service';
import { RadioModel } from '../../../models/marketing-management/radios/radio-model';
import { ConfigSetting } from '../../../common/configSetting';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-radio-add-or-change',
  templateUrl: './radio-add-or-change.component.html',
  styleUrls: ['./radio-add-or-change.component.css']
})
export class RadioAddOrChangeComponent implements OnInit {

   @Output() reloadRadioEvent = new EventEmitter();
   @ViewChild('radioAddOrChange') radioForm: any;
   radioModel: RadioModel;
   statuses: any = [];
   fileUpload: any;
   formValid: boolean;
   configSetting = ConfigSetting;

   constructor(
      private radioService: RadioService
   ) { }

   ngOnInit() {
      this.radioModel = new RadioModel();
      this.statuses = ConfigSetting.ListStatus;
      this.initRadioModel();
   }

   initRadioModel(){
      this.radioForm.reset();
      if(this.radioModel._id != undefined){
         console.log(this.radioModel._id);
         this.radioService.getRadioById({ "radioId": this.radioModel._id }).subscribe( res => {
            console.log(res);
            if(!res.error){
               this.radioModel = res.radio;
               // this.radioModel.publicDate = res.schedule.publicDate;
            } else {
               // this.radioModel = [];
               ConfigSetting.ShowError('Can not get radio')
            }
         })
      }
      else {
         this.radioModel = new RadioModel();
      }
      this.formValid = true;
   }

   reloadAndReset() {
      this.radioForm.reset();
      this.reloadRadioEvent.emit();
      $('#radio-add-or-change').modal('hide');
   }

   onAddOrChangeRadio(form){
      this.formValid = form.valid;
      if(this.formValid && this.radioModel.mediaUrl != undefined){
         if(this.radioModel._id == undefined){
            this.radioService.createRadio(this.radioModel).subscribe( res => {
               // console.log('create post',res);
               if(res.error){
                  ConfigSetting.ShowError(res.message)
               }
               else {
                  ConfigSetting.ShowSuccess("Thêm mới radio thành công");
                  this.reloadAndReset();
               }
               // this.postModel = new PostModel();
            })
         }
         else {
            // console.log(this.postModel);
            this.radioService.updateRadio(this.radioModel).subscribe( res => {
               if(res.error){
                  ConfigSetting.ShowError(res.message)
               }
               else {
                  ConfigSetting.ShowSuccess("Cập nhật radio thành công");
                  this.reloadAndReset();
               }
            })
         }

      }
      else {
         ConfigSetting.ShowError("Không thể thêm mới hoặc cập nhật radio");
      }

      // postComponent.loadListPost();
   }

   onFileChange(event){
      var files = event.target.files;
      // console.log(files);
      if(files.length){
         let form_data: FormData  = new FormData();
         form_data.append('file', files[0]);
         this.radioService.uploadMediaFile(form_data).subscribe( res => {
            console.log(res);
            if(res.error){
               ConfigSetting.ShowError(res.message)
            }
            else {
               ConfigSetting.ShowSuccess("Tải file thành công");
               this.radioModel.mediaUrl = res.filename;
            }
         })
      }
   }


   // getURLMedia(media_file_name) {
   //    return media_file_name != undefined ? `${ConfigSetting.BACKEND_URL}/images/${media_file_name}`: '';
   // }


}
