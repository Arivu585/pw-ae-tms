import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './pages/register/register.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { BookingComponent } from './pages/booking/booking.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { IMAGE_CONFIG } from '@angular/common';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"login"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"about",
    component:AboutComponent
  },
  {
    path:"contact_us",
    component:ContactUsComponent
  },
  {
    path:"packages",
    component:PackagesComponent
  },
  {
    path:"booking/:id",
    component:BookingComponent
  },
  {
    path:"enquiry",
    component:EnquiryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],providers: [
  {
    provide: IMAGE_CONFIG,
    useValue: {
      disableImageSizeWarning: true,
      disableImageLazyLoadWarning: true
    }
  },
],
})
export class AppRoutingModule { }
