import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './pages/include/sidebar/sidebar.component';
import { HeaderComponent } from './pages/include/header/header.component';
import { FooterComponent } from './pages/include/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AddPackageComponent } from './pages/add-package/add-package.component';
import { ViewPackageComponent } from './pages/view-package/view-package.component';
import { EditPackageComponent } from './pages/edit-package/edit-package.component';
import { ViewUsersComponent } from './pages/view-users/view-users.component';
import { ViewBookingsComponent } from './pages/view-bookings/view-bookings.component';
import { ViewIssuesComponent } from './pages/view-issues/view-issues.component';
import { ViewUserPagesComponent } from './pages/view-user-pages/view-user-pages.component';
import { ViewEnquiriesComponent } from './pages/view-enquiries/view-enquiries.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddUserPagesComponent } from './pages/add-user-pages/add-user-pages.component';
import { EditUserPagesComponent } from './pages/edit-user-pages/edit-user-pages.component';

@NgModule({ declarations: [
        AppComponent,
        SidebarComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        HomeComponent,
        AddPackageComponent,
        ViewPackageComponent,
        EditPackageComponent,
        ViewUsersComponent,
        ViewBookingsComponent,
        ViewIssuesComponent,
        ViewUserPagesComponent,
        ViewEnquiriesComponent,
        AddUserPagesComponent,
        EditUserPagesComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
