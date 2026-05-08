import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../common.service';
import { NavService } from '../../nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  logfail:any;
  constructor(private fb:FormBuilder, private obj:CommonService, private nav:NavService, private router:Router){}
  
  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.router.navigate(["/home"]);
    }
  }

  loginForm = this.fb.group({
    mail:['',[Validators.required,Validators.email]],
    pass:['',[Validators.required]],
  });

  //status Alert
  status: any;
  close() {
    this.status = false;
    this.loginForm.reset();
  }

  saveData():void{
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      var a = {
        mail:this.loginForm.get("mail")?.value,
        pass:this.loginForm.get("pass")?.value
      }
      var data = JSON.stringify(a);
      this.obj.login(data).subscribe((res)=>{
        if(res["status"]==true){
          localStorage.setItem("uid",res["uid"]);
          localStorage.setItem("uname",res["uname"]);
          localStorage.setItem("token",res["token"]);
          
          this.nav.updateLogin(res["uname"]);
          
          this.loginForm.reset();
          this.router.navigate(["/home"]);
        }

        if(res["status"] == false){
          this.status=true;
          this.logfail=res["message"];
        }
      });
    }
  }
}
