import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { NoteService } from '../../../services/marketing-management/note.service';
import { RegisterAgencyModel } from '../../../models/marketing-management/notes/register-agency-model';
import { RegisterAgencySearch } from '../../../models/marketing-management/search-model';
import { RegisterAgencyUpdateComponent } from '../register-agency-update/register-agency-update.component';

declare var $: any;

@Component({
  selector: 'app-register-agency',
  templateUrl: './register-agency.component.html',
  styleUrls: ['./register-agency.component.css']
})
export class RegisterAgencyComponent implements OnInit {
   @ViewChild(RegisterAgencyUpdateComponent) registerAgencyUpdate: RegisterAgencyUpdateComponent;
   ListRegisterAgency: RegisterAgencyModel[];
   searchParams: RegisterAgencySearch;
   statuses: any;
   pageSize: number = 24;
   pageIndex: number = 0;
   configSetting = ConfigSetting;

   constructor(
      private noteService: NoteService
   ) { }

   ngOnInit() {
      this.searchParams = new RegisterAgencySearch();
      this.loadListRegisterAgency();
      this.statuses = ConfigSetting.ListStatusNoteSearch;
   }

   loadListRegisterAgency() {
      this.noteService.getListRegisterAgency().subscribe( res => {
         if(!res.error) {
            this.ListRegisterAgency = res.data;
         } else {
            this.ListRegisterAgency = [];
            ConfigSetting.ShowError('Can not get list agency');
         }
      })
   }

   searchRegisterAgency() {
      this.noteService.searchRegisterAgency(this.searchParams).subscribe( res => {
         if(!res.error) {
            this.ListRegisterAgency = res.data;
         } else {
            this.ListRegisterAgency = [];
         }
      })
   }

   onShowUpdateRegisterAgency(id) {
      this.registerAgencyUpdate.registerAgencyId = id;
      this.registerAgencyUpdate.initRegisterAgency();
      $('#register-agency-update').modal('show');
   }


}
