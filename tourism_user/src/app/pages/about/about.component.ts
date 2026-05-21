import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    standalone: false
})
export class AboutComponent implements OnInit{

  constructor(private obj:CommonService,private router:Router){}

  page:any;
  ngOnInit(): void {
    if(localStorage.getItem("token") == null){
      this.router.navigate(["/login"]);
    }
    
    let type="about";
    this.obj.pageType(type).subscribe((res)=>{
      this.page=res["data"];
      if(this.page == null){
        this.router.navigate(["/home"]);
      }
    });
    
  }
}
