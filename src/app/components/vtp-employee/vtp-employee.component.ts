import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { VtpEmployeeService } from '../../services/vtp-employee.service';
import { EmployeeSearch } from '../../models/marketing-management/search-model';
import { VtpEmployeeChangeComponent } from './vtp-employee-change/vtp-employee-change.component';
import { ConfigSetting } from '../../common/configSetting';

declare var App: any;
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-vtp-employee',
  templateUrl: './vtp-employee.component.html',
  styleUrls: ['./vtp-employee.component.css']
})
export class VtpEmployeeComponent implements OnInit {

   @ViewChild(VtpEmployeeChangeComponent) vtpEmployeeChange: VtpEmployeeChangeComponent;
   ListEmployee: any;
   secondEmail: any;
   searchParams: EmployeeSearch;
   pageSize: number = 24;
   pageIndex: number = 0;
   totalItems: number = 0;
   trackById: number;
   configSetting = ConfigSetting;

   ListParent: any;
   ListChildLevel_1: any;
   ListChildLevel_2: any;
   parentId: number = -1;
   child_level_1: number = -1;
   child_level_2: number = -1;

   list_level_one: any = [];
   list_level_two: any = [];
   list_level_three: any = [];

   constructor(
      private vtpEmployeeService:  VtpEmployeeService,
      private router: Router
   ) { }

   ngOnInit() {
      $('#tree-list-org').slimScroll({
         height: '150px'
      });
      this.searchParams = new EmployeeSearch();
      this.loadListEmployee();
      // ConfigSetting.initConfigSetting();
      // this.ListParent = ConfigSetting.ListOrganization;
      this.vtpEmployeeService.getParentOrganization({ orgLevel: 6 }).subscribe( res => {
         console.log('parent', res);
         if(!res.error && res.data.length) {
            this.ListParent = res.data;
         } else {
            this.ListParent = [];
         }
      })
   }

   loadListEmployee() {
      App.blockUI();
      this.vtpEmployeeService.getListEmployee().subscribe( res => {
         if(!res.error && res.data.length) {
            this.ListEmployee = res.data;
            this.totalItems = res.data.length;
         } else {
            this.ListEmployee = [];
         }
         App.unblockUI();
      })
   }

   selectParentOrg(orgParentId) {
      console.log('chi_nhanh',orgParentId);

      if(orgParentId == -1 ) {
         this.ListChildLevel_1 = [];
         this.ListChildLevel_2 = [];
         this.child_level_1 = -1;
         this.child_level_2 = -1;
      } else {
         this.vtpEmployeeService.getChildOrganization({ 'orgParentId': orgParentId }).subscribe( res => {
            if(!res.error && res.data.length) {
               this.ListChildLevel_1 = res.data;
            } else {
               this.ListChildLevel_1 = [];
            }
         })
      }
   }
   selectChild1Org(orgParentId) {
      console.log('phong_ban', orgParentId);
      if(orgParentId == -1) {
         this.ListChildLevel_2 = [];
         this.child_level_2 = -1;
      } else {
         this.vtpEmployeeService.getChildOrganization({ 'orgParentId': orgParentId }).subscribe( res => {
            if(!res.error && res.data.length) {
               this.ListChildLevel_2 = res.data;
            } else {
               this.ListChildLevel_2 = [];
            }
         })
      }

   }

   selectChild2Org(orgParentId) {
      console.log('bo_phan', orgParentId);
      // this.vtpEmployeeService.getChildOrganization({ 'orgParentId': orgParentId }).subscribe( res => {
      //    if(!res.error && res.data.length) {
      //       this.ListChildLevel_2 = res.data;
      //    } else {
      //       this.ListChildLevel_2 = [];
      //    }
      // })
   }

   chooseLevelOne(organizationId) {
      if(this.list_level_one.includes(organizationId)){
         let index = this.list_level_one.indexOf(organizationId);
         this.list_level_one.splice(index, 1);
      } else {
         this.list_level_one.push(organizationId);
      }
      // console.log('list_level_one', this.list_level_one);
      // console.log('list_level_two', this.list_level_two);
   }

   chooseLevelTwo(organizationId, orgLevelOneId) {
      if(this.list_level_two.includes(organizationId)){
         let index = this.list_level_two.indexOf(organizationId);
         this.list_level_two.splice(index, 1);
      } else {
         this.list_level_two.push(organizationId);
      }

      // console.log('list_level_two', this.list_level_two);
      // console.log('list_level_one', this.list_level_one);
   }

   deactivateEmail(employeeId, secondEmailId) {
      this.vtpEmployeeService.deactivateEmail({ 'employeeId': employeeId, 'secondEmailId': secondEmailId  }).subscribe( res => {
         if( !res.error) {
            ConfigSetting.ShowSuccess('Deactivate email success');
            this.loadListEmployee();
         } else {
            ConfigSetting.ShowError(res.message);
         }
      })
   }

   deactivateAccount(employeeId, status) {
      this.vtpEmployeeService.deactivateAccount({ 'employeeId': employeeId, 'status': status  }).subscribe( res => {
         if( !res.error) {
            let msg = status ? "Activate account success" : 'Deactivate account success';
            ConfigSetting.ShowSuccess(msg);
            this.loadListEmployee();
         } else {
            ConfigSetting.ShowError(res.message);
         }
      })
   }

   searchEmployee() {
      App.blockUI();
      this.ListEmployee = [];
      let list_level_one = [], list_level_two = [], list_level_three = [];

      $('.level-one:checkbox:checked').each( function(){
         list_level_one.push($(this).val());
         // console.log($(this).val());
      })

      $('.level-two:checkbox:checked').each( function(){
         list_level_two.push($(this).val());
      })

      $('.level-three:checkbox:checked').each( function(){
         list_level_three.push($(this).val());
      })

      this.searchParams.list_level_one = list_level_one;
      this.searchParams.list_level_two = list_level_two;
      this.searchParams.list_level_three = list_level_three;
      this.searchParams.organizationId = this.child_level_2;

      this.vtpEmployeeService.searchEmployee(this.searchParams).subscribe( res => {

         // ConfigSetting.ShowWaiting();
         if( !res.error && res.data.length){
            this.ListEmployee = res.data;
         }
         App.unblockUI();
      })
   }

   searchByOrganization() {
      this.ListEmployee = [];
      let list_level_one = [], list_level_two = [], list_level_three = [];

      $('.level-one:checkbox:checked').each( function(){
         list_level_one.push($(this).val());
         // console.log($(this).val());
      })

      $('.level-two:checkbox:checked').each( function(){
         list_level_two.push($(this).val());
      })

      $('.level-three:checkbox:checked').each( function(){
         list_level_three.push($(this).val());
      })

      this.searchParams.list_level_one = list_level_one;
      this.searchParams.list_level_two = list_level_two;
      this.searchParams.list_level_three = list_level_three;
      // console.log('list_level_one', this.list_level_one);
      // console.log('list_level_two', this.list_level_two);
      // console.log('list_level_three', this.list_level_three);
      this.vtpEmployeeService.searchEmployee(this.searchParams).subscribe( res => {

         // ConfigSetting.ShowWaiting();
         if( !res.error && res.data.length){
            this.ListEmployee = res.data;
         }
         App.unblockUI();
      })
   }

   onShowAddSecondEmail(employeeId) {
      this.vtpEmployeeChange.currentEmployeeId = employeeId;
      this.vtpEmployeeChange.initEmployeeChange();
      $('#employee-change').modal('show');
   }

   exportExel() {
      this.vtpEmployeeService.getUrlExportInactivateAccount().subscribe( res => {
         if(!res.error) {
            console.log(res);
            window.location.href = ConfigSetting.BACKEND_URL + res.link;
         }
      })
   }



   public onRegisterConfirmation() {

   }

}
