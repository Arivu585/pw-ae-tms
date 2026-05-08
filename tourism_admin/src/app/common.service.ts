import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  
  httpOptionsOnlyAuth : any;
  httpOptions: any;
  httpOptionsNoAuth: any;

  constructor(private http: HttpClient) {

    var token = localStorage.getItem("token");


    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type':'application/json',
        'Authorization': 'Bearer ' + token,
      })
    };

    this.httpOptionsOnlyAuth = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
      })
    };

    this.httpOptionsNoAuth = {
      headers: new HttpHeaders({
        'content-type':'application/json',
      })
    };
  }

  //Admin login
  login(data:any):Observable<any>{
    return this.http.post("http://localhost:5000/adminLogin",data, this.httpOptionsNoAuth);
  }

  //Package
  packageAdd(data:any): Observable<any> {
    return this.http.post("http://localhost:5000/packages", data, this.httpOptionsOnlyAuth);
  }
  packageEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost:5000/packages/" + id, data, this.httpOptionsOnlyAuth);
  }
  packageSingle(id: string): Observable<any> {
    return this.http.get("http://localhost:5000/packages/" + id, this.httpOptions);
  }
  packageAll(): Observable<any> {
    return this.http.get('http://localhost:5000/packages', this.httpOptions);
  }
  packageDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost:5000/packages/" + id, this.httpOptions);
  }

  //Page
  pageAdd(data:any): Observable<any> {
    return this.http.post("http://localhost:5000/pages", data, this.httpOptionsOnlyAuth);
  }
  pageEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost:5000/pages/" + id, data, this.httpOptionsOnlyAuth);
  }
  pageSingle(id: string): Observable<any> {
    return this.http.get("http://localhost:5000/pages/" + id, this.httpOptions);
  }
  pageAll(): Observable<any> {
    return this.http.get('http://localhost:5000/pages', this.httpOptions);
  }
  pageDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost:5000/pages/" + id, this.httpOptions);
  }

  //User
  userAll(): Observable<any> {
    return this.http.get('http://localhost:5000/user', this.httpOptions);
  }

  //Booking
  bookingAll(): Observable<any> {
    return this.http.get('http://localhost:5000/booking', this.httpOptions);
  }

  //Enquiry
  enquiryAll(): Observable<any> {
    return this.http.get('http://localhost:5000/enquiry', this.httpOptions);
  }

}
