import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-user-pages',
    templateUrl: './add-user-pages.component.html',
    styleUrl: './add-user-pages.component.css',
    standalone: false
})
export class AddUserPagesComponent implements OnInit {

  constructor(private obj: CommonService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }
  }

  //get image file
  image: File | any;
  imageSrc: string | any;
  input:boolean=true;
  commit:boolean=false;
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
    image: ["", [Validators.required]],
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
      
      this.obj.pageAdd(data).subscribe((data) => {
        if (data["status"] == true) {
          this.status = true;
          this.pageForm.reset();
          this.clear();
        }
      });
    }
  }
}