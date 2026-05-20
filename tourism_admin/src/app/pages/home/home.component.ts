import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent implements OnInit {

  constructor(private obj: CommonService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }
  }

}
