import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { NoteService } from '../../../services/marketing-management/note.service';
import { ConsultServiceModel } from '../../../models/marketing-management/notes/consult-service-model';
import { ConsultUpdateComponent } from '../consult-update/consult-update.component';
import { ConsultServiceSearch } from '../../../models/marketing-management/search-model';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {
   @ViewChild(ConsultUpdateComponent) consultUpdate: ConsultUpdateComponent;
   ListConsultService: ConsultServiceModel[];
   searchParams: ConsultServiceSearch;
   statuses: any;
   pageIndex: number = 0;
   pageSize: number = 24;
   msg: string;

   indexNumber: number;
   constructor(
      private noteService: NoteService
   ) { }

   ngOnInit() {
      this.searchParams = new ConsultServiceSearch();
      this.statuses= ConfigSetting.ListStatusNoteSearch;
      this.indexNumber = this.pageSize * this.pageIndex - ( this.pageIndex > 0 ? this.pageSize : 0 );
      this.loadListConsultService();
   }

   loadListConsultService() {
      this.noteService.getListConsultService().subscribe (res => {
         if( !res.error) {
            this.ListConsultService = res.data;
         }
      })
   }

   searchConsultService() {
      this.msg = "";
      this.noteService.searchConsultService(this.searchParams).subscribe (res => {
         console.log(res);
         if(!res.error) {
            this.ListConsultService = res.data;
         } else {
            // ConfigSetting.ShowError("Consult service not found");
            this.msg = "Consult service not found";
            this.ListConsultService = [];
         }
      })
   }

   onShowUpdateConsultService(id) {
      this.consultUpdate.consultServiceId = id;
      this.consultUpdate.initConsultService();
      $('#consult-update').modal('show');
   }

}
