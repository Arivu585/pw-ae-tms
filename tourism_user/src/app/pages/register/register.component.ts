import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../common.service';
import { NavService } from '../../nav.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: false
})
export class RegisterComponent implements OnInit{
  constructor(private fb:FormBuilder, private obj:CommonService, private nav:NavService, private router:Router){}
  
  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.router.navigate(["/home"]);
    }
  }

  numOnly(e: KeyboardEvent) {
    const pattern = /[0-9]/;
    const input = String.fromCharCode(e.charCode);
    if (!pattern.test(input)) {
      e.preventDefault();
    }
  }

  registerForm = this.fb.group({
    name:['',[Validators.required]],
    mail:['',[Validators.required,Validators.email]],
    pass:['',[Validators.required]],
    contact:['',[Validators.required]],
  });

  //status Alert
  status: boolean = false;
  close() {
    this.status = false;
  }

  saveData():void{
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid){
      var a = {
        name:this.registerForm.get("name")?.value,
        mail:this.registerForm.get("mail")?.value,
        contact:this.registerForm.get("contact")?.value,
        pass:this.registerForm.get("pass")?.value
      }
      var data = JSON.stringify(a);
      this.obj.userAdd(data).subscribe((res)=>{
        if(res["status"]==true){
          this.status=true;
          this.registerForm.reset();
          this.router.navigate(["/login"]);
        }
      });
    }
  }
}
