export class AddressDetailsModel {
  public apartment: string
  public building: string
  public city: string
  public country: string
  public floor: string
  public postal_code: string
  public state: string
  public street: string

  constructor(
    apartment: string,
    building: string,
    city: string,
    country: string,
    floor: string,
    postalCode: string,
    state: string,
    street: string) {
    this.apartment = apartment
    this.building = building
    this.city = city
    this.country = country
    this.floor = floor
    this.postal_code = postalCode
    this.state = state
    this.street = street
  }
}
