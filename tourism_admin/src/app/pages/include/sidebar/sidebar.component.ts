import { Component } from '@angular/core';
import { NavService } from '../../../nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: string|any;

  constructor(private router:Router,private nav:NavService){ }

  ngOnInit(): void {
    this.nav.currentLogin.subscribe((res)=>{
      this.user=res;
    });
  }

  logout(){
    localStorage.removeItem("aid");
    localStorage.removeItem("aname");
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
    this.nav.updateLogin("login");
  }
}
