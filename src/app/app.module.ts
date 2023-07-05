import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowCustomerDetailsComponent } from './components/show-customer-details/show-customer-details.component';
import { CreateCustomerComponent } from './components/dynamicComponents/create-customer/create-customer.component';
import {HttpClientModule} from "@angular/common/http";
import { RequestFormComponent } from './components/request-form/request-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { UpdatePersonalDetailsComponent } from './components/dynamicComponents/update-personal-details/update-personal-details.component';
import { MessageBoxComponent } from './components/dynamicComponents/message-box/message-box.component';
import { CreateAccountComponent } from './components/dynamicComponents/create-account/create-account.component';
import { CreateContactComponent } from './components/dynamicComponents/create-contact/create-contact.component';
import {DatePipe} from "@angular/common";
import { UpdateAccountComponent } from './components/dynamicComponents/update-account/update-account.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowCustomerDetailsComponent,
    CreateCustomerComponent,
    RequestFormComponent,
    ErrorPageComponent,
    LoadingSpinnerComponent,
    UpdatePersonalDetailsComponent,
    MessageBoxComponent,
    CreateAccountComponent,
    CreateContactComponent,
    UpdateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
