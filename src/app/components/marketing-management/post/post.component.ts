import { Component, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { VtpService } from '../../../services/marketing-management/vtp.service';
import { PostService } from '../../../services/marketing-management/post.service';
import { PostSearch } from '../../../models/marketing-management/search-model';
import { PostAddOrChangeComponent } from '../post-add-or-change/post-add-or-change.component';
import { ConfigSetting } from '../../../common/configSetting';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
   @ViewChild(PostAddOrChangeComponent) postAddOrChange: PostAddOrChangeComponent;
   ListPost: any = [];
   searchParams: PostSearch;
   statuses: any;
   pageSize: number =  24;
   pageIndex:number = 0;
   msg: string;
   configSetting = ConfigSetting;


   constructor(
      private postService: PostService,
      private vtpService: VtpService
   ) { }

   ngOnInit() {
      this.statuses = ConfigSetting.ListStatusSearch;
      this.searchParams = new PostSearch();
      this.loadListPost();
   }

   loadListPost(){
      this.postService.getListPost({}).subscribe( res => {
         this.ListPost = res.error ? [] : res.data;
      })
   }

   searchPost() {
      this.msg = '';
      let requestModel = this.searchParams;
      this.postService.searchPost(requestModel).subscribe( res => {
         if(!res.error && res.data.length){
            this.ListPost =  res.data;
         }  else {
            this.ListPost = [];
         }

      })
   }

   onShowCreatePost(){
      this.postAddOrChange.postModel._id = undefined;
      this.postAddOrChange.initPostModel();
      $('#post-add-or-change').modal('show');
   }

   onShowUpdatePost(postId){
      console.log(postId);
      this.postAddOrChange.postModel._id = postId;
      this.postAddOrChange.initPostModel();
      $('#post-add-or-change').modal('show');
   }

   deletePost(postId){
      this.postService.deletePost({ "postId" : postId }).subscribe( res => {
         if(res.error){
            ConfigSetting.ShowError(res.message)
         }
         else {
            ConfigSetting.ShowSuccess("Delete post success");
            this.loadListPost();
            // this.initVtpServiceModel();
         }
      })
   }

   public onRegisterConfirmation() {
      // console.log('hallo');
      const obj = $('.post_remove_bs_confirmation');
      const register = obj.attr('confirmation_register');
      if (register === '1') {
         return;
      }
      obj.attr('confirmation_register', '1');
      obj.confirmation({
         rootSelector: '[data-toggle=confirmation]'
      });
      const $that = this;
      obj.on('confirmed.bs.confirmation', function () {
         // console.log(this);
         const id = $(this).attr('tmpid');
         $that.deletePost(id);
      });
   }

}
