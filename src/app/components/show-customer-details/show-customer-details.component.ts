import {Component, OnInit} from '@angular/core';
import {CustomerDetailsService} from "../../services/customer-details.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CustomerDetailsModel} from "../../models/customer-details.model";

@Component({
  selector: 'bss-show-customer-details',
  templateUrl: './show-customer-details.component.html',
  styleUrls: ['./show-customer-details.component.css']
})
export class ShowCustomerDetailsComponent implements OnInit {

  showUpdateForm = false
  customerData: CustomerDetailsModel
  isLoading = false
  constructor(private customerDetailsService: CustomerDetailsService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit() {
    this.isLoading = true
    this.route.params
      .subscribe((params: Params) => {
        this.customerDetailsService.getCustomerDetails(params['idType'], params['idCode'])
      })
    this.customerDetailsService.customerChanged.subscribe(
      (customer) => {
        this.customerData = customer
        this.isLoading = false
      }
    )
  }

  onOpenUpdateForm() {
    this.showUpdateForm = true
  }

  onCloseUpdateForm(event: any) {
    this.showUpdateForm = event
  }
}
