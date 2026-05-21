import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-enquiry',
    templateUrl: './enquiry.component.html',
    styleUrl: './enquiry.component.css',
    standalone: false
})
export class EnquiryComponent implements OnInit{

  constructor(private obj:CommonService,private router:Router,private fb:FormBuilder){}

  pkid:any;
  package:any;
  ngOnInit(): void {
    if(localStorage.getItem("token") == null){
      this.router.navigate(["/login"]);
    }
  }

  enquiryForm = this.fb.group({
    subject: ["", [Validators.required]],
    content: ["", [Validators.required]],
  });

  //status Alert
  status: boolean = false;
  close() {
    this.status = false;
  }

  saveData() {
    this.enquiryForm.markAllAsTouched();
    if (this.enquiryForm.valid) {
      //get current date
      var today=formatDate(new Date(), 'yyyy/MM/dd', 'en');
      var a={
        "uid":localStorage.getItem("uid"),
        "subject":this.enquiryForm.controls.subject.value,
        "content":this.enquiryForm.controls.content.value,
        "date":today,
      };
      var data=JSON.stringify(a);
      this.obj.enquiryAdd(data).subscribe((res)=>{
        if(res["status"] == true){
          this.enquiryForm.reset();
          this.status=true;
        }
      });
    }
  }
}
