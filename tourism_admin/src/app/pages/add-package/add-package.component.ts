import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent implements OnInit {

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

  packageForm = this.fb.group({
    name: ["", [Validators.required]],
    type: ["", [Validators.required]],
    location: ["", [Validators.required]],
    price: ["", [Validators.required]],
    feature: ["", [Validators.required]],
    image: ["", [Validators.required]],
    descp: ["", [Validators.required]],
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
    this.packageForm.controls.image.reset();
    this.imageSrc = '';
    this.image = '';
    if(this.image != null)
    {
      this.commit=false;
      this.input=true;
    }
  }

  name:string|any;
  type:string|any;
  location:string|any;
  price:string|any;
  feature:string|any;
  descp:string|any;
  saveData() {
    this.packageForm.markAllAsTouched();
    if (this.packageForm.valid) {
      
      this.name = this.packageForm.get("name")?.value;
      this.type = this.packageForm.get("type")?.value;
      this.location = this.packageForm.get("location")?.value;
      this.price = this.packageForm.get("price")?.value;
      this.feature = this.packageForm.get("feature")?.value;
      this.descp = this.packageForm.get("descp")?.value;

      const data = new FormData();
      data.append("name", this.name);
      data.append("type", this.type);
      data.append("location", this.location);
      data.append("price", this.price);
      data.append("feature", this.feature);
      data.append("descp", this.descp);
      data.append("image", this.image);
      
      this.obj.packageAdd(data).subscribe((data) => {
        if (data["status"] == true) {
          this.status = true;
          this.packageForm.reset();
          this.clear();
        }
      });
    }
  }
}