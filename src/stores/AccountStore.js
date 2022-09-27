export default class AccountStore {
  constructor({
    name = '', accountNumber = '', amount = 0, transactions = [],
  }) {
    this.name = name;
    this.accountNumber = accountNumber;
    this.amount = amount;
    this.transactions = transactions;
  }
}
