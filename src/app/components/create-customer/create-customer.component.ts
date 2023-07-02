import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerDetailsService} from "../../services/customer-details.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'bss-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  @Output() showComponent = new EventEmitter<boolean>(true)
  createCustomerForm: FormGroup
  // contactType: string[] = []

  constructor(private customerDetailsService: CustomerDetailsService, private router: Router) {
  }

  ngOnInit() {

    this.createCustomerForm = new FormGroup({
      'identificationDetails': new FormGroup({
        'idCode': new FormControl(null, Validators.required),
        'idType': new FormControl(null, Validators.required),
        'startDate': new FormControl(null, Validators.required),
        'endDate': new FormControl(null, Validators.required)
      }),
      'individualDetails': new FormGroup({
        'givenName': new FormControl(null, Validators.required),
        'familyName': new FormControl(null, Validators.required)
      }),
      // 'contactDetails': new FormArray([])
      'contactDetails': new FormGroup({
        'role': new FormControl(null, Validators.required),
        'apartment': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'country': new FormControl(null, Validators.required),
        'postalCode': new FormControl(null, Validators.required),
        'street': new FormControl(null, Validators.required),
        'startDate': new FormControl(null, Validators.required)
      })
    })
  }

  onSubmit() {
    this.customerDetailsService.createCustomerDetails(this.createCustomerForm.value)
      .subscribe(res => {
        this.router.navigate(['/'])
        this.onClose()
    }, error => {
        this.router.navigate(['/not-found', error.error])
        this.onClose()
    })
  }

  onClose() {
    this.showComponent.emit(false)
  }

  // get controls() {
  //   return (<FormArray>this.createCustomerForm.get('contactDetails')).controls
  // }

  // onSelectContactType(i: number) {
  //   switch (this.contactType[i]) {
  //     case 'email':
  //       const g = (<FormGroup>(<FormArray>this.createCustomerForm.get('contactDetails')).at(i))
  //       g.addControl('email', new FormControl(null, Validators.required))
  //       g.addControl('emailStartDate', new FormControl(null, Validators.required))
  //       break
  //     case 'postal-address':
  //       const group = (<FormGroup>(<FormArray>this.createCustomerForm.get('contactDetails')).at(i))
  //       group.addControl('apartment', new FormControl(null))
  //       group.addControl('building', new FormControl(null))
  //       group.addControl('city', new FormControl(null))
  //       group.addControl('country', new FormControl(null))
  //       group.addControl('floor', new FormControl(null))
  //       group.addControl('postalCode', new FormControl(null))
  //       group.addControl('state', new FormControl(null))
  //       group.addControl('street', new FormControl(null))
  //       group.addControl('postalStartDate', new FormControl(null, Validators.required))
  //       group.addControl('postalEndDate', new FormControl(null))
  //       break
  //     case 'telephone-number':
  //       const grp = (<FormGroup>(<FormArray>this.createCustomerForm.get('contactDetails')).at(i))
  //       grp.addControl('number', new FormControl(null, Validators.required))
  //       grp.addControl('numberType', new FormControl(null, Validators.required))
  //       grp.addControl('teleStartDate', new FormControl(null, Validators.required))
  //       break
  //   }
  // }
  //
  // onAddContact() {
  //   (<FormArray>this.createCustomerForm.get('contactDetails')).push(
  //     new FormGroup({
  //       'role': new FormControl(null),
  //       'contactType': new FormControl(null, Validators.required),
  //     })
  //   )
  // }
}
