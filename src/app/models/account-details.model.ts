export class AccountDetailsModel {
  public uuid: string
  public accountId: string
  public name: string
  public accountType: string
  public marketType: string
  public expiration: boolean

  constructor(uuid: string, accountId: string, name: string, accountType: string, marketType: string, expiration: boolean) {
    this.uuid = uuid,
    this.accountId = accountId,
    this.name = name,
    this.accountType = accountType,
    this.marketType = marketType,
    this.expiration = expiration
  }
}
