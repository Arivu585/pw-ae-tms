import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-view-package',
    templateUrl: './view-package.component.html',
    styleUrl: './view-package.component.css',
    standalone: false
})
export class ViewPackageComponent implements OnInit{

  constructor(private obj:CommonService, private cdr:ChangeDetectorRef, private router:Router){}

  package:string|any;
  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }

    this.obj.packageAll().subscribe((res)=>{
      this.package=res["data"];
      this.cdr.detectChanges();
    })
  }

  //status Alert
  status: boolean = false;
  close() {
    this.status = false;
  }

  remove(id:string,index:number){
    this.obj.packageDelete(id).subscribe((data)=>{
      this.package.splice(index,1);
      this.status=true;
    })
  }

}
