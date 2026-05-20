import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { NavService } from '../../nav.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: false
})
export class LoginComponent implements OnInit{

  constructor(private fb:FormBuilder, private obj:CommonService, private nav:NavService, private router:Router){}
  logfail:any;
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
          localStorage.setItem("aid",res["aid"]);
          localStorage.setItem("aname",res["aname"]);
          localStorage.setItem("token",res["token"]);
          
          this.nav.updateLogin(res["aname"]);
          
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
