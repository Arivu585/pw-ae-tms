import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.css',
    standalone: false
})
export class BookingComponent implements OnInit{

  constructor(private route:ActivatedRoute,private obj:CommonService,private router:Router,private fb:FormBuilder){}

  pkid:any;
  package:any;
  ngOnInit(): void {
    if(localStorage.getItem("token") == null){
      this.router.navigate(["/login"]);
    }

    this.route.params.subscribe((get)=>{
      this.pkid=get["id"];
    });

    this.obj.packageSingle(this.pkid).subscribe((res)=>{
      this.package=res["data"];
    });
  }

  bookingForm = this.fb.group({
    fdate: ["", [Validators.required]],
    tdate: ["", [Validators.required]],
    remark: ["", [Validators.required]],
  });

  //status Alert
  status: boolean = false;
  close() {
    this.status = false;
  }

  saveData() {
    this.bookingForm.markAllAsTouched();
    if (this.bookingForm.valid) {
      var a={
        "pkid":this.pkid,
        "uid":localStorage.getItem("uid"),
        "fdate":this.bookingForm.controls.fdate.value,
        "tdate":this.bookingForm.controls.tdate.value,
        "remarks":this.bookingForm.controls.remark.value,
      };
      var data=JSON.stringify(a);
      this.obj.bookingAdd(data).subscribe((res)=>{
        if(res["status"] == true){
          this.bookingForm.reset();
          this.status=true;
        }
      });
    }
  }
}
