export class AddressDetailsModel {
  public uuid: string
  public apartment: string
  public building: string
  public city: string
  public country: string
  public floor: string
  public postal_code: string
  public state: string
  public street: string
  public expiration: boolean

  constructor(
    uuid: string,
    apartment: string,
    building: string,
    city: string,
    country: string,
    floor: string,
    postalCode: string,
    state: string,
    street: string,
    expiration: boolean) {
    this.uuid = uuid
    this.apartment = apartment
    this.building = building
    this.city = city
    this.country = country
    this.floor = floor
    this.postal_code = postalCode
    this.state = state
    this.street = street
    this.expiration = expiration
  }
}
