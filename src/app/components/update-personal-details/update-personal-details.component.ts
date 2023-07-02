import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerDetailsService} from "../../services/customer-details.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bss-update-personal-details',
  templateUrl: './update-personal-details.component.html',
  styleUrls: ['./update-personal-details.component.css']
})
export class UpdatePersonalDetailsComponent implements OnInit {

  @Output() showUpdateForm = new EventEmitter<boolean>()
  updateForm: FormGroup

  constructor(private customerDataService: CustomerDetailsService, private router: Router) {
  }
  ngOnInit() {
    this.updateForm = new FormGroup({
      'givenName': new FormControl(null, Validators.required),
      'additionalName': new FormControl(null),
      'familyName': new FormControl(null),
      'formattedName': new FormControl(null),
      'placeOfBirth': new FormControl(null),
      'dateOfBirth': new FormControl(null),
      'gender': new FormControl(null),
      'honorificPrefix': new FormControl(null),
      'language': new FormControl(null),
      'maritalStatus': new FormControl(null),
      'nationality': new FormControl(null)
    })
  }

  onSubmit() {
    this.customerDataService.updateCustomerDetails(this.updateForm.value)
      .subscribe(res => {
        console.log(res)
        this.showUpdateForm.emit(false)
      })
  }

  onCloseUpdateForm() {
    this.showUpdateForm.emit(false)
  }
}
