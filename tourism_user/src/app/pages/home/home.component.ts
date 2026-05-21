import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent implements OnInit{

  constructor(private obj:CommonService,private router:Router){}

  packages:any;
  ngOnInit(): void {
    if(localStorage.getItem("token") == null){
      this.router.navigate(["/login"]);
    }
    let limit=3;
    this.obj.packageLimit(limit).subscribe((res)=>{
      this.packages=res["data"];
    })
  }
}
