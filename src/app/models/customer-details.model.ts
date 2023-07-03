import {AddressDetailsModel} from "./address-details.model";
import {AccountDetailsModel} from "./account-details.model";

export class CustomerDetailsModel {
  public uuid: string
  public DOB: string
  public POB: string
  public address: AddressDetailsModel[]
  public accounts: AccountDetailsModel[]
  public first_name: string
  public gender: string
  public language: string
  public last_name: string
  public marital_status: string
  public middle_name: string
  public nationality: string

  constructor(
    uuid: string,
    dob: string,
    pob: string,
    address: AddressDetailsModel[],
    accounts: AccountDetailsModel[],
    firstName: string,
    gender: string,
    language: string,
    lastName: string,
    maritalStatus: string,
    middleName: string,
    nationality: string,
  ) {
  this.uuid = uuid
  this.DOB = dob
  this.POB = pob
  this.address = address
  this.accounts = accounts
  this.first_name = firstName
  this.gender = gender
  this.language = language
  this.last_name = lastName
  this.marital_status = maritalStatus
  this.middle_name = middleName
  this.nationality = nationality
  }
}
