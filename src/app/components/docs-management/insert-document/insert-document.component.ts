import {Component, OnInit, ViewChild} from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
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
    private documentService: DocumentService,
    private router: Router
  ) { }

  // @ViewChild('createDocsForm') createDocsForm: any;

  documentInsertModel: DocumentInsertModel;
  configSetting = ConfigSetting;
  listTags: any[] = [];
  treeData: any[] = [];
  formValid: boolean;
  titleContent: string = "Nhập tiêu đề";
  replaceForContent: string = "Nhập tên văn bản thay thế";

  listTagsModel: any[] = [];
  title: any[] = [];
  replacedFor: any[] = [];

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
    if(!this.title.length){
      ConfigSetting.ShowError('Chưa nhập tiêu đề');
      return;
    }
    if(!this.replacedFor.length){
      ConfigSetting.ShowError('Chưa nhập văn bản thay thế');
      return;
    }

     if(!this.documentInsertModel.groupId){
       ConfigSetting.ShowError('Chưa chọn nhóm văn bản');
        return;
     }
     if(!this.listTagsModel.length){
       ConfigSetting.ShowError('Chưa chọn thẻ');
        return;
     }

     if(!this.documentInsertModel.issuedDate){
       ConfigSetting.ShowError('Chưa chọn ngày ban hành');
        return;
     }

     if(!this.documentInsertModel.expiredDate){
       ConfigSetting.ShowError('Chưa chọn ngày hết hiệu lực');
        return;
     }

     if(!this.documentInsertModel.summary){
       ConfigSetting.ShowError('Chưa nhập nội dung tóm tắt');
        return;
     }
     if (!this.documentInsertModel.pathFile) {
       ConfigSetting.ShowError('Chưa tải văn bản lên');
        return;
     } else  {
          this.documentInsertModel.insertedAt =  new Date();
          this.documentInsertModel.updatedAt = new Date();
          this.documentInsertModel.insertBy = "kien";
          this.documentInsertModel.updateBy = "kien";
          this.documentInsertModel.viewTimes = 0;
          this.documentInsertModel.status = 1;
          this.documentInsertModel.title = this.title[0].text;
          this.documentInsertModel.replacedFor = this.replacedFor[0].value;
          // this.documentInsertModel.title = this.documentInsertModel.title.text;
          // this.documentInsertModel.replacedFor = this.documentInsertModel.replacedFor.text;
          let tags =  {};
          this.listTagsModel.map( item => {
            tags[item.value] = {
              'tagId': item.value,
              'tagName': item.text
            } ;
          })
          this.documentInsertModel.tags = null;


         this.documentService.createDocs({ 'documents': this.documentInsertModel, 'tags': tags }).subscribe( response => {
           console.log('response ', response);
           if (response.errorMessage) {
             ConfigSetting.ShowError(response.errorMessage);

           } else {
              ConfigSetting.ShowSuccess('Thêm văn bản thành công');
              this.documentInsertModel = new DocumentInsertModel();
              this.listTagsModel = [];
              this.title = [];
              this.replacedFor = [];
           }
         });
     }
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
