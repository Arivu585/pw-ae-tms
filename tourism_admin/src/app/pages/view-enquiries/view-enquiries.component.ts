import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-view-enquiries',
    templateUrl: './view-enquiries.component.html',
    styleUrl: './view-enquiries.component.css',
    standalone: false
})
export class ViewEnquiriesComponent implements OnInit {

  constructor(private obj: CommonService,private cdr: ChangeDetectorRef, private router: Router) { }
  enquiry:any;
  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }

    this.obj.enquiryAll().subscribe((res)=>{
      this.enquiry=res["data"];
      this.cdr.detectChanges();
    });

  }

}
