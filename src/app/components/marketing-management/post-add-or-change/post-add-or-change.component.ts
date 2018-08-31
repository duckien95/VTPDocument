import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { VtpService } from '../../../services/marketing-management/vtp.service';
import { PostService } from '../../../services/marketing-management/post.service';
import { PostModel } from '../../../models/marketing-management/post/post-model';
import { ConfigSetting } from '../../../common/configSetting';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-post-add-or-change',
  templateUrl: './post-add-or-change.component.html',
  styleUrls: ['./post-add-or-change.component.css']
})
export class PostAddOrChangeComponent implements OnInit {
   @Output() reloadPostEvent = new EventEmitter();
   @ViewChild('postAddOrChange') postAddOrChangeForm: any;
   postModel: PostModel;
   ListParentService: any = [];
   ListChildService: any = [];
   ListStatus: any = [];
   fileUpload: any;
   parentServiceId: string;
   formValid: boolean;
   configSetting = ConfigSetting;
   public myDatePickerOptions: IMyDpOptions = {
   // other options...
   dateFormat: 'dd.mm.yyyy',
};
   public model: any = { date: { year: 2018, month: 10, day: 9 } };
   constructor(
      private postService: PostService,
      private vtpService: VtpService,
      // @Host() postComponent: PostComponent
   ) {}

   ngOnInit() {
      this.postModel =  new PostModel();
      this.initPostModel();
   }

   initPostModel(){
      // console.log('init add or change', this.vtpServiceModel.serviceId )
      // this.postModel.publishDate = "20/10/2005";
      this.formValid = true;
      this.postAddOrChangeForm.reset();
      this.ListStatus = ConfigSetting.ListStatus;
      this.vtpService.getListParentService().subscribe( res => {
         this.ListParentService = res.error ? [] :  res.data;
      })
      if(this.postModel._id != undefined){
         console.log(this.postModel._id);
         this.postService.getListPost({ "postId": this.postModel._id }).subscribe( res => {
            // console.log(res);
            if(!res.error && res.data.length > 0){
               this.postModel = res.data[0];
               // this.vtpService.getListService({ "serviceId": res.data[0].servicesId }).subscribe( resp => {
               //    console.log(resp);
               //    if(!resp.error && resp.data.length > 0 && resp.parent != null){
               //       this.vtpService.getListChildService({"parentServiceId": resp.parent._id }).subscribe(response => {
               //          this.ListChildService = response.error ? [] : response.data;
               //       })
               //    }
               // })
               this.vtpService.getListSiblingService({'serviceId': res.data[0].servicesId}).subscribe( resp => {
                  if(!resp.error && res.data.length) {
                     this.ListChildService = resp.data;
                  } else {
                     this.ListChildService = [];
                  }
               })

               // this.postModel.parentServiceId = res.parant._id;
            } else {
               ConfigSetting.ShowError('Can not get list child');
            }
         })

      }
      else {
         this.postModel = new PostModel();
         // this.parentServiceId = null;
      }
   }

   resetAndReload() {
      this.postAddOrChangeForm.reset();
      this.reloadPostEvent.emit();
      this.initPostModel();
      $('#post-add-or-change').modal('hide');
   }

   onAddOrChangePost(form){
      this.formValid = form.valid;
      // console.log(form);
      // console.log(this.postModel.thumbnailImage == undefined);
      // console.log((this.postModel.imageUrl == '' || this.postModel.imageUrl == undefined) && !this.formValid);
      if(this.formValid && this.postModel.thumbnailImage != undefined){

         let form_data: FormData  = new FormData();
         for(var key in this.postModel){
            form_data.append(key, this.postModel[key]);
         }
         // form_data.append(this.postModel);
         form_data.append('file', this.fileUpload);

         if(this.postModel._id == undefined){
            this.postService.createPost(this.postModel).subscribe( res => {
               // console.log('create post',res);
               if(res.error){
                  ConfigSetting.ShowError(res.message)
               }
               else {
                  ConfigSetting.ShowSuccess("Create post success");
                  this.resetAndReload();
               }
               // this.postModel = new PostModel();
            })
         }
         else {
            // console.log(this.postModel);
            this.postService.updatePost(this.postModel).subscribe( res => {
               if(res.error){
                  ConfigSetting.ShowError(res.message)
               }
               else {
                  ConfigSetting.ShowSuccess("Update post success");
                  this.resetAndReload();
               }
            })
         }

      }
      else {
         ConfigSetting.ShowError("Can not create post");
      }

      // postComponent.loadListPost();
   }

   onFileChange(event){
      var files = event.target.files;
      if(files.length){
         let form_data: FormData  = new FormData();
         form_data.append('file', files[0]);
         this.postService.saveThumbnailImage(form_data).subscribe( res => {
            console.log(res);
            if(res.error){
               ConfigSetting.ShowError(res.message)
            }
            else {
               ConfigSetting.ShowSuccess("Upload Image Success");
               this.postModel.thumbnailImage = res.filename;
            }
         })
      }
      // var preview = document.getElementById('previewImages');
      // if(files.length){
      //    let file = files[0];
      //    console.log(file);
      //    this.fileUpload = file;
      //    let reader = new FileReader();
      //    reader.onload = function (e) {
      //       let divElement = document.createElement("div");
      //       divElement.className = "col-md-3 my-1";
      //       let img = document.createElement("img");
      //       img.height = 200;
      //       img.className = "max-width"
      //       img.src = reader.result;
      //       divElement.appendChild(img);
      //       preview.appendChild(divElement);
      //    }
      //    reader.readAsDataURL(file);
      // }
   }

   onSelectParentService(parentServiceId){
      this.vtpService.getListChildService({"parentServiceId": parentServiceId }).subscribe(res => {
         console.log(res);
         this.ListChildService = res.error ? [] : res.data;
      })

   }

   // getURLImage(img_file_name) {
   //    return img_file_name != undefined ? `${ConfigSetting.BACKEND_URL}/images/${img_file_name}` : '';
   // }

}
