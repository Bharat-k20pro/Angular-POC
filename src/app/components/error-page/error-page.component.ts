import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {CustomerDetailsService} from "../../services/customer-details.service";

@Component({
  selector: 'bss-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string
  constructor(private route: ActivatedRoute, private customerDetailsService: CustomerDetailsService) { }

  ngOnInit(): void {
    // this.errorMessage = this.route.snapshot.data['message']
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     this.errorMessage = data['message']
    //   }
    // )
    this.errorMessage = this.route.snapshot.params['message']
  }
}
