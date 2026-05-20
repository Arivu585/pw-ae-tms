import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-view-bookings',
    templateUrl: './view-bookings.component.html',
    styleUrl: './view-bookings.component.css',
    standalone: false
})
export class ViewBookingsComponent implements OnInit {
[x: string]: any;

  constructor(private obj: CommonService, private cdr: ChangeDetectorRef, private router: Router) { }
  booking:any;

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }

    this.obj.bookingAll().subscribe((res)=>{
      this.booking=res["data"];
      this.cdr.detectChanges();
    });
  }

}
