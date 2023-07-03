import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowCustomerDetailsComponent } from './components/show-customer-details/show-customer-details.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import {HttpClientModule} from "@angular/common/http";
import { RequestFormComponent } from './components/request-form/request-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { UpdatePersonalDetailsComponent } from './components/update-personal-details/update-personal-details.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
