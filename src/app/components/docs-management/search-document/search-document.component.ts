import { AfterViewInit, OnChanges, Component, OnInit, ViewChild, Input, forwardRef, SimpleChanges } from '@angular/core';
import { DocumentService } from '../../../services/document-management/document.service';
import { DocumentSearchModel } from '../../../models/document-management/search-model';
import { ConfigSetting } from '../../../common/configSetting';
import  { SuggestTagComponent } from '../suggest-tag/suggest-tag.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-search-document',
  templateUrl: './search-document.component.html',
  styleUrls: ['./search-document.component.css']
})
export class SearchDocumentComponent implements OnChanges {

    constructor(
        private documentService: DocumentService
    ) {
      this.searchParams = new DocumentSearchModel();
      this.documentService.getTreeData().subscribe( response => {
        if (response){
              this.treeData.push(response);
        }
      });
      this.documentService.getAllTags().subscribe( response => {
        if(response.status != 200){
              this.listTags = response.map( item => {
                return {
                  text: item.groupName,
                  value: item.id
                }
              });
        }
      })
    }

    @ViewChild(SuggestTagComponent) suggestTag: SuggestTagComponent;


    searchParams: DocumentSearchModel;
    treeData: any[] = [];
    listTags: any[] = [];
    listDocsSelected: any[] = [];
    isOpen: boolean = true;
    configSetting = ConfigSetting;
    replaceForContent: string = "Nhập văn bản thay thế";

    pageSize: number =  24;
    pageIndex: number = 1;
    listDocs: any[] = [];

    ListTags: any = [
        { text: "111", value: 111 },
        { text: "112", value: 112 },
        { text: "113", value: 113 },
        { text: "222", value: 222 },
        { text: "223", value: 223 },
        { text: "224", value: 224 }
    ];
    str: string = '';

    TagMatch: any = [];

    ngOnChanges(changes: SimpleChanges) {
      if (changes && changes.data && changes.data.currentValue) {

      }

    }

    searchDocument(){
      console.log(this.searchParams);
      this.listDocs = [];
      this.documentService.searchDocs(this.searchParams).subscribe( response => {

        if(response.length){
             this.listDocs = response;
        }
      })
    }

    getDownloadFileURL(pathFile){
      return 'http://125.212.238.119:8889/downloadFile/' + pathFile;
    }

    addTags(e){
      console.log('add tag', this.listDocsSelected);
    }

    removeTags(e){
      console.log('remove tag');
    }

    formTags(e){
      console.log('form tag');
    }

}
