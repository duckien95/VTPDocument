import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../../services/document-management/document.service';
import { DocumentInsertModel } from '../../../models/document-management/insert-model';
import { ConfigSetting } from '../../../common/configSetting';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-insert-document',
  templateUrl: './insert-document.component.html',
  styleUrls: ['./insert-document.component.css']
})
export class InsertDocumentComponent implements OnInit {

  constructor(
    private documentService: DocumentService
  ) { }

  documentInsertModel: DocumentInsertModel;
  configSetting = ConfigSetting;
  listTags: any[] = [];
  treeData: any[] = [];
  formValid: boolean;
  titleContent: string = "Nhập tiêu đề";
  replaceForContent: string = "Nhập văn bản thay thế";

  ngOnInit() {
    this.documentInsertModel = new DocumentInsertModel();
    this.formValid = true;
    this.documentService.getAllTags().subscribe( response => {
      console.log(response);
      if(response.status != 200){
            this.listTags = response.map( item => {
              return {
                text: item.tagName,
                value: item.tagId
              }
            });
      }
    })
    this.listTags = [{
value: 1,
text: "thưởng tết",
updatedAt: "2018-08-20T08:22:03.911+0000"
},
{
value: 2,
text: "nghỉ lễ",
updatedAt: "2018-08-20T08:22:17.038+0000"
},
{
value: 3,
text: "lương kinh doanh",
updatedAt: "2018-08-20T08:22:25.670+0000"
}]

    this.documentService.getTreeData().subscribe( response => {
        if (response){
              this.treeData.push(response);
        }
      });
  }


  uploadFile(event) {
    const files = event.target.files;
      if (files.length) {
      const form_data: FormData = new FormData();
      form_data.append('file', files[0]);
      this.documentService.uploadFile(form_data).subscribe(res => {
        console.log(res);
        if (res.status === 'success') {
          ConfigSetting.ShowSuccess('Tải file văn bản thành công');
          this.documentInsertModel.pathFile = res.file;
        } else {
          ConfigSetting.ShowError('Tải văn bản không thành công');
        }
      });
    }
  }

  createDocs(){
    console.log('create docs', this.documentInsertModel);
     if (this.formValid && this.documentInsertModel.pathFile){
          this.documentInsertModel.insertedAt =  new Date();
          this.documentInsertModel.updatedAt = new Date();
          this.documentInsertModel.insertBy = "kien";
          this.documentInsertModel.updateBy = "kien";
          this.documentInsertModel.viewTimes = 0;
          this.documentInsertModel.status = 1;
          this.documentInsertModel.groupId = 1;
          // this.documentInsertModel.title = this.documentInsertModel.title.text;
          // this.documentInsertModel.replacedFor = this.documentInsertModel.replacedFor.text;
          let tags =  {};
          this.documentInsertModel.tags.map( item => {
            tags[item.value] = {
              'tagId': item.value,
              'tagName': item.text
            } ;
          })
       this.documentInsertModel.tags = null;


         this.documentService.createDocs({ 'documents': this.documentInsertModel, 'tags': tags }).subscribe( response => {
           console.log('response ', response);
           if (response) {

           }
         });
     }
     else ConfigSetting.ShowError('Tạo văn bản không thành công');
  }

  addTags(e){
    console.log('add tag');
  }

  removeTags(e){
    console.log('remove tag');
  }

  formTags(e){
    console.log('form tag');
  }

}
