import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { BookingComponent } from './pages/booking/booking.component';
import { HeaderComponent } from './pages/include/header/header.component';
import { FooterComponent } from './pages/include/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PackageCardComponent } from './pages/include/package-card/package-card.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        PackagesComponent,
        EnquiryComponent,
        AboutComponent,
        ContactUsComponent,
        BookingComponent,
        HeaderComponent,
        FooterComponent,
        PackageCardComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
