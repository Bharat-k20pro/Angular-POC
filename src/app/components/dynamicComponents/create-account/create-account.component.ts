import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerDetailsService} from "../../../services/customer-details.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bss-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  @Output() showAccountForm = new EventEmitter<boolean>()
  accountForm: FormGroup

  constructor(private customerDetailsService: CustomerDetailsService,
              private router: Router,
              private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.accountForm = new FormGroup({
      'accountType': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'marketType': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    this.customerDetailsService.createAccount(this.accountForm.value)
      .subscribe(res => {
        console.log(res)
        this.showAccountForm.emit(false)
        alert('Account is added. Reload the page to get changes!')
      },error => {
        console.log(error)
        this.router.navigate(['/not-found', error.error])
        this.showAccountForm.emit(false)
      })
  }

  onCloseUpdateForm() {
    this.showAccountForm.emit(false)
  }
}
