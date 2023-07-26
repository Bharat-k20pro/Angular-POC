import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerDetailsService} from "../../../services/customer-details.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'bss-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  @Input() index: number
  @Output() showUpdateAccountForm = new EventEmitter<boolean>()
  updateAccountForm: FormGroup

  constructor(private customerDetailsService: CustomerDetailsService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.updateAccountForm = new FormGroup({
      'accountType': new FormControl(this.customerDetailsService.customerData.accounts[this.index].accountType, Validators.required),
      'name': new FormControl(this.customerDetailsService.customerData.accounts[this.index].name, Validators.required),
      'marketType': new FormControl(this.customerDetailsService.customerData.accounts[this.index].marketType, Validators.required),
      'endDate': new FormControl(null, Validators.required),
    })

  }

  onSubmit() {
    this.customerDetailsService.updateAccount(this.updateAccountForm.value, this.index)
      .subscribe({
        next: res => {
          console.log(res)
          this.showUpdateAccountForm.emit(false)

          this.route.params
            .subscribe((params: Params) => {
              this.customerDetailsService.getCustomerDetails(params['idType'], params['idCode'])
            })
        },
        error: error => {
          console.log(error)
          this.router.navigate(['/not-found', error.error])
          this.showUpdateAccountForm.emit(false)
        }
      })
  }

  onCloseUpdateForm() {
    this.showUpdateAccountForm.emit(false)
  }
}
