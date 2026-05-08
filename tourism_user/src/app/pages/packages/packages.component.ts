import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent implements OnInit{

  constructor(private obj:CommonService,private router:Router){}

  packages:any;
  ngOnInit(): void {
    if(localStorage.getItem("token") == null){
      this.router.navigate(["/login"]);
    }
    this.obj.packageAll().subscribe((res)=>{
      this.packages=res["data"];
    })
  }
}
