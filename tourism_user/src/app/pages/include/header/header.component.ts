import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../../nav.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent implements OnInit{
  name: string|any;

  constructor(private router:Router,private nav:NavService){ }

  ngOnInit(): void {
    this.nav.currentLogin.subscribe((res)=>{
      this.name=res;
    });
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("uname");
    this.router.navigate(["/login"]);
    this.nav.updateLogin("login");
  }
}