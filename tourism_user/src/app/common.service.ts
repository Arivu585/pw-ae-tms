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

  //User Login
  login(data:any):Observable<any>{
    return this.http.post("http://localhost:5000/userLogin",data, this.httpOptionsNoAuth);
  }

  //User
  userAdd(data:any): Observable<any> {
    return this.http.post("http://localhost:5000/user", data, this.httpOptionsNoAuth);
  }
  userEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost:5000/user/" + id, data, this.httpOptions);
  }
  userSingle(id: string): Observable<any> {
    return this.http.get("http://localhost:5000/user/" + id, this.httpOptions);
  }
  userAll(): Observable<any> {
    return this.http.get('http://localhost:5000/user', this.httpOptions);
  }
  userDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost:5000/user/" + id, this.httpOptions);
  }

  //Package
  packageSingle(id: string): Observable<any> {
    return this.http.get("http://localhost:5000/packages/" + id, this.httpOptions);
  }
  packageAll(): Observable<any> {
    return this.http.get('http://localhost:5000/packages', this.httpOptions);
  }
  packageLimit(limit:any): Observable<any> {
    return this.http.get('http://localhost:5000/packagesLimit/' + limit, this.httpOptions);
  }

  //Page
  pageSingle(id: string): Observable<any> {
    return this.http.get("http://localhost:5000/pages/" + id, this.httpOptions);
  }
  pageAll(): Observable<any> {
    return this.http.get('http://localhost:5000/pages', this.httpOptions);
  }
  pageType(type: any): Observable<any> {
    return this.http.get("http://localhost:5000/pagesType/" + type, this.httpOptions);
  }
  
  //Booking
  bookingSingle(id: string): Observable<any> {
    return this.http.get("http://localhost:5000/booking/" + id, this.httpOptions);
  }
  bookingAll(): Observable<any> {
    return this.http.get('http://localhost:5000/booking', this.httpOptions);
  }
  bookingAdd(data:any): Observable<any> {
    return this.http.post("http://localhost:5000/booking", data, this.httpOptions);
  }
  bookingEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost:5000/booking/" + id, data, this.httpOptions);
  }
  
  bookingDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost:5000/booking/" + id, this.httpOptions);
  }

  //Enquiry
  enquirySingle(id: string): Observable<any> {
    return this.http.get("http://localhost:5000/enquiry/" + id, this.httpOptions);
  }
  enquiryAll(): Observable<any> {
    return this.http.get('http://localhost:5000/enquiry', this.httpOptions);
  }
  enquiryAdd(data:any): Observable<any> {
    return this.http.post("http://localhost:5000/enquiry", data, this.httpOptions);
  }
  enquiryEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost:5000/enquiry/" + id, data, this.httpOptions);
  }
  enquiryDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost:5000/enquiry/" + id, this.httpOptions);
  }
}
