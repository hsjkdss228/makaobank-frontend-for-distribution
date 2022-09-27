export default class TransferStore {
  constructor() {
    this.amounts = {
      352: 10_000,
      179: 2_000,
    };
  }

  amount(accountNumber) {
    return this.amounts[accountNumber];
  }

  transfer(from, to, amount) {
    if (amount > this.amounts[from]) {
      return;
    }

    this.amounts[from] -= amount;
    this.amounts[to] += amount;
  }
}
