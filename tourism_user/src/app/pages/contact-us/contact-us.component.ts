import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit{

  constructor(private obj:CommonService,private router:Router){}

  page:any;
  ngOnInit(): void {
    if(localStorage.getItem("token") == null){
      this.router.navigate(["/login"]);
    }
    
    let type="contact";
    this.obj.pageType(type).subscribe((res)=>{
      this.page=res["data"];
      if(this.page == null){
        this.router.navigate(["/home"]);
      }
    });

    
  }
}
