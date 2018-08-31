import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { NoteService } from '../../../services/marketing-management/note.service';
import { RegisterAgencyModel } from '../../../models/marketing-management/notes/register-agency-model';

declare var $: any;

@Component({
  selector: 'app-register-agency-update',
  templateUrl: './register-agency-update.component.html',
  styleUrls: ['./register-agency-update.component.css']
})
export class RegisterAgencyUpdateComponent implements OnInit {

   @Output() reloadRegisterAgencyEvent = new EventEmitter();
   @ViewChild('registerAgencyUpdate') registerAgencyForm: any;

   registerAgencyModel: RegisterAgencyModel;
   registerAgencyId: string;
   previousNote: string;
   newNote: string;
   statuses: any;
   formValid: boolean;
   configSetting = ConfigSetting;
   constructor(
      private noteService: NoteService
   ) { }

   ngOnInit() {
      this.registerAgencyModel = new RegisterAgencyModel();
      this.statuses = ConfigSetting.ListStatusNote;
      this.formValid = true;
   }

   initRegisterAgency() {
      this.newNote = '';
      if(this.registerAgencyId != undefined) {
         this.noteService.getRegisterAgencyById({ 'registerAgencyId': this.registerAgencyId }).subscribe( res => {
            if(!res.error) {
               this.registerAgencyModel = res.data;
            } else {
               ConfigSetting.ShowError('Can not get register agency');
               // this.registerAgencyModel = ;
            }
         })
      }
   }

   resetAndReload() {
      this.reloadRegisterAgencyEvent.emit();
      this.registerAgencyForm.reset();
      $('#register-agency-update').modal('hide');
   }

   onUpdateRegisterAgency(form) {
      this.formValid= form.valid;
      if(form.valid) {
         this.registerAgencyModel.note = this.registerAgencyModel.note + " \n " +  ConfigSetting.formatNote(this.newNote);
         this.noteService.updateRegisterAgency(this.registerAgencyModel).subscribe( res => {
            if(!res.error) {
               ConfigSetting.ShowSuccess('Update success');
               this.resetAndReload();
            } else {
               ConfigSetting.ShowError(res.message);
            }
         })
      } else {
         ConfigSetting.ShowError('Can not update')
      }
   }

}
