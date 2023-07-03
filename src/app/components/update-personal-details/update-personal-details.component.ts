import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerDetailsService} from "../../services/customer-details.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bss-update-personal-details',
  templateUrl: './update-personal-details.component.html',
  styleUrls: ['./update-personal-details.component.css']
})
export class UpdatePersonalDetailsComponent implements OnInit {

  @Output() showUpdateForm = new EventEmitter<boolean>()
  updateForm: FormGroup

  constructor(private customerDetailsService: CustomerDetailsService,
              private router: Router,
              private route: ActivatedRoute
              ) {
  }
  ngOnInit() {
    this.updateForm = new FormGroup({
      'givenName': new FormControl(this.customerDetailsService.customerData.first_name, Validators.required),
      'additionalName': new FormControl(this.customerDetailsService.customerData.middle_name),
      'familyName': new FormControl(this.customerDetailsService.customerData.last_name),
      'formattedName': new FormControl(null),
      'placeOfBirth': new FormControl(this.customerDetailsService.customerData.POB),
      'dateOfBirth': new FormControl(this.customerDetailsService.customerData.DOB),
      'gender': new FormControl(this.customerDetailsService.customerData.gender),
      'honorificPrefix': new FormControl(null),
      'language': new FormControl(this.customerDetailsService.customerData.language),
      'maritalStatus': new FormControl(this.customerDetailsService.customerData.marital_status),
      'nationality': new FormControl(this.customerDetailsService.customerData.nationality)
    })

  }

  onSubmit() {
    this.customerDetailsService.updateCustomerDetails(this.updateForm.value)
      .subscribe(res => {
        console.log(res)
        this.showUpdateForm.emit(false)
        alert('Customer is updated. Reload the page to get changes!')
      })
  }

  onCloseUpdateForm() {
    this.showUpdateForm.emit(false)
  }
}
