import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowCustomerDetailsComponent} from "./components/show-customer-details/show-customer-details.component";
import {RequestFormComponent} from "./components/request-form/request-form.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";

const routes: Routes = [
  { path: '', component: RequestFormComponent },
  { path: 'form', component: RequestFormComponent },
  { path: 'details/:idType/:idCode', component: ShowCustomerDetailsComponent },
  { path: 'not-found/:message', component: ErrorPageComponent },
  { path: '**', redirectTo: '/not-found/Page not found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
