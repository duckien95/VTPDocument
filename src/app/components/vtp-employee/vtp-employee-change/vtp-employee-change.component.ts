import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { VtpEmployeeService } from '../../../services/vtp-employee.service';

declare var $: any;

@Component({
  selector: 'app-vtp-employee-change',
  templateUrl: './vtp-employee-change.component.html',
  styleUrls: ['./vtp-employee-change.component.css']
})
export class VtpEmployeeChangeComponent implements OnInit {
   @Output() reloadEmployeeEvent = new EventEmitter();
   @ViewChild('employeeChange') employeeChangeForm: any;
   employee: any;
   currentEmployeeId: string;
   secondEmail: string;
   formValid: boolean;

   constructor(
      private vtpEmployeeService: VtpEmployeeService
   ) { }

   ngOnInit() {
      this.formValid = true;
      this.employee = [];
   }

   initEmployeeChange() {
      this.employee = [];
      this.formValid = true;
      this.employeeChangeForm.reset();
      if(this.currentEmployeeId != undefined) {
         this.vtpEmployeeService.getEmployeeById({ 'employeeId': this.currentEmployeeId }).subscribe( res => {
            if(!res.error) {
               this.employee = res.data;
            }
         })
      }
   }

   resetAndReload() {
      this.reloadEmployeeEvent.emit();
      this.employeeChangeForm.reset();
      $('#employee-change').modal('hide');
      this.secondEmail = '';
   }

   onAddSecondEmail(){
      if(this.formValid) {
         this.vtpEmployeeService.addSecondEmail({ employeeId: this.currentEmployeeId, secondEmail: this.secondEmail }).subscribe( res => {
            if(!res.error) {
               this.resetAndReload();
               ConfigSetting.ShowSuccess('Add second email success')
            } else {
               ConfigSetting.ShowError(res.message);
            }
         })
      } else {
         ConfigSetting.ShowError('Can not add second email');
      }
   }

}
