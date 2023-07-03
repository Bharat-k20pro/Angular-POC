export class AccountDetailsModel {
  public accountId: string
  public name: string
  public accountType: string
  public marketType: string

  constructor(accountId: string, name: string, accountType: string, marketType: string) {
    this.accountId = accountId,
    this.name = name,
    this.accountType = accountType,
    this.marketType = marketType
  }
}
