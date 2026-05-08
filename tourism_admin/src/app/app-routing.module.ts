import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AddPackageComponent } from './pages/add-package/add-package.component';
import { ViewPackageComponent } from './pages/view-package/view-package.component';
import { ViewUsersComponent } from './pages/view-users/view-users.component';
import { ViewBookingsComponent } from './pages/view-bookings/view-bookings.component';
import { EditPackageComponent } from './pages/edit-package/edit-package.component';
import { ViewIssuesComponent } from './pages/view-issues/view-issues.component';
import { ViewEnquiriesComponent } from './pages/view-enquiries/view-enquiries.component';
import { ViewUserPagesComponent } from './pages/view-user-pages/view-user-pages.component';
import { EditUserPagesComponent } from './pages/edit-user-pages/edit-user-pages.component';
import { AddUserPagesComponent } from './pages/add-user-pages/add-user-pages.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"add_package",
    component:AddPackageComponent
  },
  {
    path:"view_package",
    component:ViewPackageComponent
  },
  {
    path:"edit_package/:id",
    component:EditPackageComponent
  },
  {
    path:"view_user",
    component:ViewUsersComponent
  },
  {
    path:"view_booking",
    component:ViewBookingsComponent
  },
  {
    path:"view_issue",
    component:ViewIssuesComponent
  },
  {
    path:"view_enquiry",
    component:ViewEnquiriesComponent
  },
  {
    path:"add_user_pages",
    component:AddUserPagesComponent
  },
  {
    path:"edit_user_pages/:id",
    component:EditUserPagesComponent
  },
  {
    path:"view_user_pages",
    component:ViewUserPagesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
