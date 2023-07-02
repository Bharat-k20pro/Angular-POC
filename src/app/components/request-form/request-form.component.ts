import {Component, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CustomerDetailsService} from "../../services/customer-details.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent {
  showCreateCustomer = false
  constructor(private customerDetailsService: CustomerDetailsService, private router: Router) {
  }
  onSubmit(form: NgForm) {
    const idType = form.value.idType
    const idCode = form.value.idCode

    this.router.navigate(['details', idType, idCode])

    form.reset()
  }

  onCreateCustomer() {
    this.showCreateCustomer = true
    // this.dataFetchService.createCustomerDetails()
  }

  onCloseComponent(event: any) {
    this.showCreateCustomer = event
  }
}
