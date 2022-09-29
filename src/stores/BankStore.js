import { apiService } from '../services/ApiService';

export default class BankStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.accountNumber = '';
    this.amount = 0;
    this.transactions = [];

    this.transferState = '';

    this.errorMessage = '';
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  async login({ accountNumber, password }) {
    try {
      const { accessToken, name, amount } = await apiService.postSession({
        accountNumber, password,
      });

      this.name = name;
      this.amount = amount;

      return accessToken;
    } catch (exception) {
      // console.error(e);
      return '';
    }
  }

  async fetchAccount() {
    const { name, accountNumber, amount } = await apiService.fetchAccount();

    this.name = name;
    this.accountNumber = accountNumber;
    this.amount = amount;

    this.publish();
  }

  async requestTransfer({ to, amount, name }) {
    this.changeTransferState('PROCESSING');

    try {
      await apiService.createTransaction({ to, amount, name });
      this.changeTransferState('SUCCESS');
    } catch (error) {
      // console.log(error.response.data);
      const { message } = error.response.data;
      this.changeTransferState('FAIL', { errorMessage: message });
    }
  }

  async fetchTransactions() {
    this.transactions = [];
    this.publish();

    this.transactions = await apiService.fetchTransactions();
    this.publish();
  }

  changeTransferState(state, { errorMessage = '' } = {}) {
    this.transferState = state;
    this.errorMessage = errorMessage;
    this.publish();
  }

  get isTransferProcessing() {
    return this.transferState === 'PROCESSING';
  }

  get isTransferSuccess() {
    return this.transferState === 'SUCCESS';
  }

  get isTransferFail() {
    return this.transferState === 'FAIL';
  }
}

export const bankStore = new BankStore();
