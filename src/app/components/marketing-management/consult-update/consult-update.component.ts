import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { NoteService } from '../../../services/marketing-management/note.service';
import { ConsultServiceModel } from '../../../models/marketing-management/notes/consult-service-model';

declare var $: any;

@Component({
  selector: 'app-consult-update',
  templateUrl: './consult-update.component.html',
  styleUrls: ['./consult-update.component.css']
})
export class ConsultUpdateComponent implements OnInit {
   @Output() reloadConsultServiceEvent = new EventEmitter();
   @ViewChild('consultService') consultUpdateForm: any;

   consultServiceModel: ConsultServiceModel;
   consultServiceId: string;
   statuses: any;
   formValid: boolean;
   newNote: string;
   constructor(
      private noteService: NoteService
   ) { }

   ngOnInit() {
      this.consultServiceModel = new ConsultServiceModel();
      this.formValid = true;
      this.statuses = ConfigSetting.ListStatusNote;
      this.initConsultService();
   }

   initConsultService() {
      this.newNote = '';
      if(this.consultServiceId != undefined) {
         this.noteService.getConsultServiceById({ 'consultServiceId': this.consultServiceId }).subscribe( res => {
            if(!res.error) {
               this.consultServiceModel = res.data;
            }
         })
      }
   }

   resetAndReload() {
      this.reloadConsultServiceEvent.emit();
      this.consultUpdateForm.reset();
      $('#consult-update').modal('hide');
   }

   onUpdateConsultService(form) {
      this.formValid= form.valid;
      if(form.valid) {
         this.consultServiceModel.note = this.consultServiceModel.note + " \n " +  ConfigSetting.formatNote(this.newNote);
         this.noteService.updateConsultService(this.consultServiceModel).subscribe( res => {
            if(!res.error) {
               ConfigSetting.ShowSuccess('Update success');
               this.resetAndReload();

            } else {
               ConfigSetting.ShowError(res.message);
            }
         })
      } else {
         ConfigSetting.ShowError("Can not update");
      }
   }
}
