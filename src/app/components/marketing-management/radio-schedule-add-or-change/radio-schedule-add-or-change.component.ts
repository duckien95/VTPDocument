import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { RadioService } from '../../../services/marketing-management/radio.service';
import { RadioSearch } from '../../../models/marketing-management/search-model';
import { RadioModel } from '../../../models/marketing-management/radios/radio-model';
import { RadioScheduleModel } from '../../../models/marketing-management/radios/radio-schedule-model';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-radio-schedule-add-or-change',
  templateUrl: './radio-schedule-add-or-change.component.html',
  styleUrls: ['./radio-schedule-add-or-change.component.css']
})
export class RadioScheduleAddOrChangeComponent implements OnInit {
   @Output() reloadRadioScheduleEvent = new EventEmitter();
   @ViewChild('radioScheduleAddOrChange') radioScheduleForm: any;
   currentDateTime: string;
   radioId: string;
   radioScheduleId: string;
   radioModel: RadioModel;
   radioScheduleModel: RadioScheduleModel;
   statuses: any;
   formValid: boolean;
   configSetting = ConfigSetting;
   // minDate: string = new Date();
    constructor(
       private radioService: RadioService,
       // private router: Router
    ) { }

    ngOnInit() {
      let date = new Date();
      this.currentDateTime =  "2018-06-07T00:00";
       this.radioModel = new RadioModel();
       this.formValid = true;
       this.statuses = ConfigSetting.ListStatus;
      this.onInitRadioSchedule();
    }

    onInitRadioSchedule() {
      // console.log(this.radioModel);
      this.formValid = true;
      this.radioScheduleForm.reset();
      if(this.radioScheduleId != undefined) {
         this.radioService.getRadioScheduleById({ 'radioScheduleId': this.radioScheduleId }).subscribe( res => {
            console.log(res);
            if(!res.error) {
               this.radioScheduleModel = res.data;
            } else {
               // this.radioScheduleModel = [];
               ConfigSetting.ShowError('Can not get radio schedule');
            }
         })
      } else {
         // console.log('radioScheduleId is undefined');
         this.radioScheduleModel = new RadioScheduleModel();
      }
   }

   reloadAndReset() {
      this.radioScheduleForm.reset();
      this.reloadRadioScheduleEvent.emit();
      $('#radio-schedule-add-or-change').modal('hide');
   }

   onAddOrChangeRadioSchedule(form) {
      this.formValid = form.valid;
      if(form.valid) {
         if(this.radioScheduleId != undefined){
            console.log('radio != undefined');
            let requestModel = this.radioScheduleModel;
            this.radioService.updateRadioSchedule(requestModel).subscribe( res => {
               console.log(res);
               if(!res.error) {
                  ConfigSetting.ShowSuccess('Cập nhật lịch phát radio thành công.');
                  this.reloadAndReset();
               } else {
                  ConfigSetting.ShowError(res.message);
               }
            })
         } else {
            let requestModel = this.radioModel;
            requestModel.publicDate = this.radioScheduleModel.publicDate;
            requestModel.radioId = this.radioModel._id;
            this.radioService.createRadioSchedule(requestModel).subscribe( res => {
               if(!res.error) {
                  ConfigSetting.ShowSuccess('Thêm lịch phát radio thành công.');
                  this.reloadAndReset();
                  // console.log(this.radioScheduleForm)

               } else {
                  ConfigSetting.ShowError(res.message);
               }
            })
         }

      } else {
         ConfigSetting.ShowError("Không thể thêm mới hoặc cập nhật lịch phát radio");
      }
   }

    // getURLMedia(media_file_name) {
    //    return media_file_name != undefined ? `${ConfigSetting.BACKEND_URL}/images/${media_file_name}` : '';
    // }

}
