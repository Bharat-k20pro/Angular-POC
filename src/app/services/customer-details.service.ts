import { Injectable } from '@angular/core';
import { CustomerDetailsModel } from '../models/customer-details.model';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Subject, throwError, map} from 'rxjs'
import {Router} from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import {AddressDetailsModel} from "../models/address-details.model";
import {AccountDetailsModel} from "../models/account-details.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  BASE_URL = 'https://bssapi-qrp-devint-fleet.qvantel.systems';
  customerChanged = new Subject<CustomerDetailsModel>()
  customerData: CustomerDetailsModel
  constructor(private http: HttpClient,
              private router: Router) { }

  private convertToCustomerData(data: any): CustomerDetailsModel {
    const included = data['included']
    const contactMedias = included.filter((inData: any) => inData.type == 'contact-media')
    const postalAddresses = contactMedias.filter((contactMedia: any) => contactMedia.attributes['medium-type'] === 'postal-address')
    const addresses: AddressDetailsModel[] = postalAddresses.map((postalAddress: any) => {

      console.log(new Date(postalAddress.attributes['valid-for']['end-datetime']) >= new Date())
      return new AddressDetailsModel(
        postalAddress.id,
        postalAddress.attributes.medium['apartment'] ? postalAddress.attributes.medium['apartment'] : '',
        postalAddress.attributes.medium['building'] ? postalAddress.attributes.medium['building'] : '',
        postalAddress.attributes.medium['city'] ? postalAddress.attributes.medium['city'] : '',
        postalAddress.attributes.medium['country'] ? postalAddress.attributes.medium['country'] : '',
        postalAddress.attributes.medium['floor'] ? postalAddress.attributes.medium['floor'] : '',
        postalAddress.attributes.medium['postal-code'] ? postalAddress.attributes.medium['postal-code'] : '',
        postalAddress.attributes.medium['state'] ? postalAddress.attributes.medium['state'] : '',
        postalAddress.attributes.medium['street'] ? postalAddress.attributes.medium['street'] : '',
        (postalAddress.attributes['valid-for']['end-datetime'] && (new Date(postalAddress.attributes['valid-for']['end-datetime']) <= new Date()))
      )
    }).filter((address: AddressDetailsModel) => !address.expiration)

    const customerAccounts = included.filter((inData: any) => inData.type === 'customer-accounts')
    const accounts = customerAccounts.map((customerAccount: any) => {
      return new AccountDetailsModel(
        customerAccount.id,
        customerAccount.attributes['account-id'] ? customerAccount.attributes['account-id'] : '',
        customerAccount.attributes['name'] ? customerAccount.attributes['name'] : '',
        customerAccount.attributes['account-type'] ? customerAccount.attributes['account-type'] : '',
        customerAccount.attributes['market-type'] ? customerAccount.attributes['market-type'] : '',
        (customerAccount.attributes['valid-for']['end-datetime'] && (new Date(customerAccount.attributes['valid-for']['end-datetime']) <= new Date()))
      )
    })

    const individuals = included.find((inData: any) => inData.type == 'individuals')
    const customerData = new CustomerDetailsModel(
      individuals.id,
      individuals.attributes['date-of-birth'] ? individuals.attributes['date-of-birth'] : '',
      individuals.attributes['place-of-birth'] ? individuals.attributes['place-of-birth'] : '',
      addresses,
      accounts,
      individuals.attributes['given-name'] ? individuals.attributes['given-name'] : '',
      individuals.attributes['gender'] ? individuals.attributes['gender'] : '',
      individuals.attributes['language'] ? individuals.attributes['language'] : '',
      individuals.attributes['family-name'] ? individuals.attributes['family-name'] : '',
      individuals.attributes['marital-status'] ? individuals.attributes['marital-status'] : '',
      individuals.attributes['additional-name'] ? individuals.attributes['additional-name'] : '',
      individuals.attributes['nationality'] ? individuals.attributes['nationality'] : '',
    )
    return customerData
  }
  getCustomerDetails(idType: string, idCode: string) {
    let idParams = new HttpParams()
    idParams = idParams.append('id', idCode)

    console.log(idType, idCode)

    return this.http.get<any>(
        this.BASE_URL + `/api/identifications?filter=%28AND%20%28EQ%20identification-id%20%22${idCode}%22%29%20%28EQ%20identification-type%20%22${idType}%22%29%29&include=party.contact-media,party.customer-accounts`,
      {
        params: idParams,
      }
    ).pipe(map((data: any) => {
      return this.convertToCustomerData(data)
    }), catchError(err => {
      return throwError(err.error)
    }))
      .subscribe({
        next: data => {
          this.customerData = data
          this.customerChanged.next(this.customerData)
        },
        error: errMsg => {
          this.router.navigate(['/not-found', errMsg ? errMsg : 'Customer not found!'])
        }
      })
  }

  createCustomerDetails(data: any) {
    const individual_uuid = uuidv4()
    const identifications_uuid = uuidv4()
    const contact_media_uuid = uuidv4()

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
    ).pipe(catchError(err => throwError(err.error)))
  }

  createAccount(data: any) {
    const account_uuid = uuidv4()
    const pr_uuid = uuidv4()

    let body: any = {
      "data": {
        "type": "customer-accounts-create",
        "relationships": {
          "new-instance": {
            "data": {
              "type": "customer-accounts",
              "id": account_uuid
            }
          }
        }
      },
      "included": [
        {
          "type": "customer-accounts",
          "id": account_uuid,
          "attributes": {
            "name": data.name,
            "account-type": data.accountType,
            "market-type": data.marketType,
            "billing-permissions": {
              "billing-allowed": "true",
              "service-number-itemization-allowed": "false",
              "overtime-interest-allowed": "false"
            },
            "debt-collection-permissions": {
              "debt-collection-allowed": "yes"
            },
            "valid-for": {
              "meta": {
                "type": "valid-for-datetime"
              },
              "start-datetime": data.startDate + 'T00:00:00.000Z',
              "end-datetime": data.endDate + 'T00:00:00.000Z'
            }
          },
          "relationships": {
            "related-parties": {
              "data": [
                { "type": "party-relationships", "id": pr_uuid }
              ]
            }
          }
        },
        {
          "type": "party-relationships",
          "id": pr_uuid,
          "attributes": {
            "valid-for": {
              "meta": {
                "type": "valid-for-datetime"
              },
              "start-datetime": data.startDate + 'T00:00:00.000Z'
            }
          },
          "relationships": {
            "party": {
              "data": {
                "type": "individuals",
                "id": this.customerData.uuid
              }
            }
          }
        }
      ]
    }

    return this.http.post(
      this.BASE_URL + '/api/customer-accounts-create',
      body
    ).pipe(catchError(err => throwError(err.error)))
  }

  createContact(data: any) {
    const cm_uuid = uuidv4()
    let body: any = {
      "data": {
        "type": "contact-media-create",
        "relationships": {
          "new-instance": {
            "data": { "type": "contact-media", "id": cm_uuid }
          }
        }
      },
      "included": [
        {
          "type": "contact-media",
          "id": cm_uuid,
          "attributes": {
            "role": data.role,
            "medium-type": "postal-address",
            "medium": {
              "meta": {
                "type": "postal-address"
              },
              "apartment": data.apartment,
              "building": data.building,
              "country": data.country,
              "city": data.city,
              "floor": data.floor,
              "postal-code": data.postalCode,
              "state": data.state,
              "street": data.street,
            },
            "valid-for": {
              "meta": {
                "type": "valid-for-datetime"
              },
              "start-datetime": data.startDate + 'T00:00:00.000Z'
            }
          },
          "relationships": {
            "party": {
              "data": { "type": "individuals", "id": this.customerData.uuid }
            }
          }
        }
      ]
    }

    return this.http.post(
      this.BASE_URL + '/api/contact-media-create',
      body
    ).pipe(catchError(err => throwError(err.error)))
  }

  deleteContact(i: number) {
    return this.http.post(
      this.BASE_URL + '/api/contact-media-terminate',
      {
        "data": {
          "type": "contact-media-terminate",

          "attributes": {
            "end-datetime": new Date().toISOString()
          },
          "relationships": {
            "instance": {
              "data": { "type": "contact-media", "id": this.customerData.address[i].uuid }
            }
          }
        }
      }
    ).pipe(catchError(err => throwError(err.error)))
  }

  updateAccount(data: any, i: number) {
    return this.http.post(
      this.BASE_URL + '/api/customer-accounts-update',
      {
        "data": {
          "type": "customer-accounts-update",
          "attributes": {
            "end-datetime": new Date(data.endDate).toISOString(),
            "name": data.name,
            "account-type": data.type,
            "market-type": data.marketType,
          },
          "relationships": {
            "instance": {
              "data": { "type": "customer-accounts", "id": this.customerData.accounts[i].uuid }
            }
          }
        }
      }
    ).pipe(catchError(err => throwError(err.error)))
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
      this.BASE_URL + '/api/individuals-update',
      body
    ).pipe(catchError(err => throwError(err.error)))
  }
}
