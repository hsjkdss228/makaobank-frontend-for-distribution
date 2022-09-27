export default class BankStore {
  constructor() {
    this.name = '';
    this.accountNumber = '';
    this.amount = 0;
    this.transactions = [];
  }

  login({ accountNumber, password }) {
    if (accountNumber !== '352' || password !== 'password') {
      return;
    }

    this.name = '황인우';
    this.amount = 1_000_000;
  }
}
