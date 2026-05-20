import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-user-pages',
    templateUrl: './edit-user-pages.component.html',
    styleUrl: './edit-user-pages.component.css',
    standalone: false
})
export class EditUserPagesComponent implements OnInit {

  constructor(private route:ActivatedRoute,private obj: CommonService, private fb: FormBuilder, private router: Router) { }
  pgid:any;
  page:any;
  pageType:any;
  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }

    this.route.params.subscribe((get)=>{
      this.pgid=get["id"];
    });

    this.obj.pageSingle(this.pgid).subscribe((res)=>{
      this.page=res["data"];
      this.pageType=this.page.at(0).type;
      this.pageForm.controls.type.setValue(this.page.at(0).type);
      this.pageForm.controls.content.setValue(this.page.at(0).content);
      this.imageSrc="http://localhost:5000/public/images/page/"+this.page.at(0).image;
    });
  }

  //get image file
  image: File | any;
  imageSrc: string | any;
  input:boolean=false;
  commit:boolean=true;
  onchange(event: any){

    this.image = event.target.files[0];
    if(this.image != null)
    {
      this.commit=true;
      this.input=false;
    }
    let reader = new FileReader();
    reader.onload = e =>{
      let blob= e.target?.result;
      this.imageSrc=blob;
    };
    reader.readAsDataURL(this.image);

  }

  pageForm = this.fb.group({
    type: ["", [Validators.required]],
    content: ["", [Validators.required]],
    image: [""],
  });

  numOnly(e: KeyboardEvent) {
    const pattern = /[0-9]/;
    const input = String.fromCharCode(e.charCode);
    if (!pattern.test(input)) {
      e.preventDefault();
    }
  }

  //status Alert
  status: boolean = false;
  close() {
    this.status = false;
  }

  //clear form
  clear() {
    this.pageForm.controls.image.reset();
    this.imageSrc = '';
    this.image = '';
    if(this.image != null)
    {
      this.commit=false;
      this.input=true;
    }
    this.pageForm.controls.image.addValidators([Validators.required]);
  }

  type:string|any;
  content:string|any;
  saveData() {
    this.pageForm.markAllAsTouched();
    if (this.pageForm.valid) {
      
      this.type = this.pageForm.get("type")?.value;
      this.content = this.pageForm.get("content")?.value;

      const data = new FormData();
      data.append("type", this.type);
      data.append("content", this.content);
      data.append("image", this.image);
      
      this.obj.pageEdit(this.pgid,data).subscribe((data) => {
        if (data["status"] == true) {
          this.status = true;
        }
      });
    }
  }
}