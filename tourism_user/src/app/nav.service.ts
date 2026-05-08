import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  login= new BehaviorSubject("");
  uname:String | any;
  
  constructor(){
    if(localStorage.getItem("token") == null){
      this.login.next("login");
    }else{
      this.uname = localStorage.getItem("uname");
      this.login.next(this.uname);
    }
  }

  currentLogin=this.login.asObservable();

  updateLogin(newLogin:string){
    this.login.next(newLogin);
  }
}
