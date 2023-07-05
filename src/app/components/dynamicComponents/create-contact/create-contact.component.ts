import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerDetailsService} from "../../../services/customer-details.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'bss-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  @Output() showContactForm = new EventEmitter<boolean>()
  contactForm: FormGroup

  constructor(private customerDetailsService: CustomerDetailsService,
              private router: Router,
              private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.contactForm = new FormGroup({
      'role': new FormControl(null, Validators.required),
      'apartment': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'postalCode': new FormControl(null, Validators.required),
      'street': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required)
    })

  }

  onSubmit() {
    this.customerDetailsService.createContact(this.contactForm.value)
      .subscribe(res => {
        console.log(res)
        this.showContactForm.emit(false)

        this.route.params
          .subscribe((params: Params) => {
            this.customerDetailsService.getCustomerDetails(params['idType'], params['idCode'])
          })
      },error => {
        console.log(error)
        this.router.navigate(['/not-found', error.error])
        this.showContactForm.emit(false)
      })
  }

  onCloseUpdateForm() {
    this.showContactForm.emit(false)
  }
}
