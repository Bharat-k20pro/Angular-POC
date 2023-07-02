import { Injectable } from '@angular/core';
import { CustomerDetailsModel } from '../models/customer-details.model';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Subject, throwError} from 'rxjs'
import {Router} from "@angular/router";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  API_URL = 'http://localhost:8080/customer/details/';
  customerChanged = new Subject<CustomerDetailsModel>()
  customerData: CustomerDetailsModel
  constructor(private http: HttpClient, private router: Router) { }

  getCustomerDetails(idType: string, idCode: string) {
    let idParams = new HttpParams()
    idParams = idParams.append('id', idCode)

    return this.http.get<CustomerDetailsModel>(
      this.API_URL + idType,
      {
        params: idParams,
      }
    ).pipe(catchError(err => {
      console.log(err.status)
      return throwError(err.error)
    }))
      .subscribe(data => {
        this.customerData = data
        this.customerChanged.next(this.customerData)
    }, errMsg => {
      this.router.navigate(['/not-found', errMsg])
    })
  }

  createCustomerDetails(data: any) {
    const individual_uuid = uuidv4()
    const identifications_uuid = uuidv4()
    const contact_media_uuid = uuidv4()
    //console.log(this.datePipe.transform(new Date(data.identificationDetails.startDate), "yyyy-MM-dd"))
    console.log(data.contactDetails.startDate)
    console.log(data.identificationDetails.startDate, data.identificationDetails.endDate)

    const body = {
      "data": {
      "type": "individuals-create",
        "relationships": {
        "new-instance": {
          "data": {
            "type": "individuals",
              "id": individual_uuid
          }
        }
      }
    },
      "included": [
      {
        "type": "individuals",
        "id": individual_uuid,
        "attributes": {
          "given-name": data.individualDetails.givenName,
          "family-name": data.individualDetails.familyName
        },
        "relationships": {
          "contact-media": {
            "data": [
              { "type": "contact-media", "id": contact_media_uuid }
            ]
          },
          "identifications": {
            "data": [
              { "type": "identifications", "id": identifications_uuid }
            ]
          }
        }
      },
      {
        "type": "identifications",
        "id": identifications_uuid,
        "attributes": {
          "identification-id": data.identificationDetails.idCode,
          "identification-type": data.identificationDetails.idType,
          "valid-for": {
            "meta": {
              "type": "valid-for-datetime"
            },
            "start-datetime": data.identificationDetails.startDate + 'T00:00:00.000Z',
            "end-datetime": data.identificationDetails.endDate + 'T00:00:00.000Z'
          }
        }
      },
      {
        "type": "contact-media",
        "id": contact_media_uuid,
        "attributes": {
          "medium-type": "postal-address",
          "role": data.contactDetails.role,
          "medium": {
            "meta": {
              "type": "postal-address"
            },
            "apartment": data.contactDetails.apartment,
            "building": data.contactDetails.building,
            "floor": data.contactDetails.floor,
            "state": data.contactDetails.state,
            "city": data.contactDetails.city,
            "country": data.contactDetails.country,
            "postal-code": data.contactDetails.postalCode,
            "street": data.contactDetails.street
          },
          "valid-for": {
            "meta": {
              "type": "valid-for-datetime"
            },
            "start-datetime": data.contactDetails.startDate + 'T00:00:00.000Z'
          }
        }
      },
    ]
    }

    return this.http.post(
      'https://bssapi-qrp-demo.qvantel.systems/api/individuals-create',
      body
    )
  }

  updateCustomerDetails(data: any) {
    let body: any = {
      "data": {
        "type": "individuals-update",
        "attributes": {},
        "relationships": {
          "instance": {
            "data": { "type": "individuals", "id": this.customerData.uuid }
          }
        }
      }
    }

    Object.keys(data).forEach(key => {
      if(data[key]) {
        const kebabCaseKey: string = key.replace(/[A-Z]/g, (letter:string) => `-${letter.toLowerCase()}`)
        body.data.attributes[kebabCaseKey] = data[key]
      }
    })

    return this.http.post(
      'https://bssapi-qrp-demo.qvantel.systems/api/individuals-update',
      body
    )
  }
}
