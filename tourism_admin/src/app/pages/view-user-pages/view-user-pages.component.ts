import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';

@Component({
    selector: 'app-view-user-pages',
    templateUrl: './view-user-pages.component.html',
    styleUrl: './view-user-pages.component.css',
    standalone: false
})
export class ViewUserPagesComponent implements OnInit{

  constructor(private obj:CommonService,private router:Router){}

  page:string|any;
  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }

    this.obj.pageAll().subscribe((res)=>{
      this.page=res["data"];
    })
  }

  //status Alert
  status: boolean = false;
  close() {
    this.status = false;
  }

  remove(id:string,index:number){
    this.obj.pageDelete(id).subscribe((data)=>{
      this.page.splice(index,1);
      this.status=true;
    })
  }

}
