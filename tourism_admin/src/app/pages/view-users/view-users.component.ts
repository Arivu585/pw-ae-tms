import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit {

  constructor(private obj: CommonService, private router: Router) { }
  user:any;
  ngOnInit(): void { 
    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }

    this.obj.userAll().subscribe((res)=>{
      this.user=res["data"];
    });
  }

}
