/* eslint-disable no-prototype-builtins */
import { apiService } from '../services/ApiService';

export default class BankStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.accountNumber = '';
    this.amount = 0;
    this.transactions = [];

    this.loginState = '';

    this.emptyName = '';
    this.emptyAccountNumber = '';
    this.emptyPassword = '';
    this.emptyConfirmPassword = '';
    this.incorrectName = '';
    this.incorrectAccountNumber = '';
    this.incorrectPassword = '';
    this.alreadyExistingAccountNumber = '';
    this.passwordDoNotMatch = '';
    this.registerDefaultError = '';

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
    } catch (error) {
      const { message } = error.response.data;
      this.changeLoginState('FAIL', { errorMessage: message });
      return '';
    }
  }

  changeLoginState(state, { errorMessage = '' } = {}) {
    this.loginState = state;
    this.errorMessage = errorMessage;
    this.publish();
  }

  get isLoginFailed() {
    return this.loginState === 'FAIL';
  }

  async register({
    name, accountNumber, password, confirmPassword,
  }) {
    try {
      await apiService.register({
        name, accountNumber, password, confirmPassword,
      });
    } catch (error) {
      const { codesAndMessages } = error.response.data;
      // console.log(typeof error.response.data.codesAndMessages);
      this.changeRegisterState(codesAndMessages);
    }
  }

  changeRegisterState(codesAndMessages) {
    this.emptyName = '';
    this.emptyAccountNumber = '';
    this.emptyPassword = '';
    this.emptyConfirmPassword = '';
    this.incorrectName = '';
    this.incorrectAccountNumber = '';
    this.incorrectPassword = '';
    this.alreadyExistingAccountNumber = '';
    this.passwordDoNotMatch = '';
    this.registerDefaultError = '';

    if (codesAndMessages.hasOwnProperty('2000')) {
      this.emptyName = codesAndMessages['2000'];
    }
    if (codesAndMessages.hasOwnProperty('2001')) {
      this.emptyAccountNumber = codesAndMessages['2001'];
    }
    if (codesAndMessages.hasOwnProperty('2002')) {
      this.emptyPassword = codesAndMessages['2002'];
    }
    if (codesAndMessages.hasOwnProperty('2003')) {
      this.emptyConfirmPassword = codesAndMessages['2003'];
    }
    if (codesAndMessages.hasOwnProperty('2004')) {
      this.incorrectName = codesAndMessages['2004'];
    }
    if (codesAndMessages.hasOwnProperty('2005')) {
      this.incorrectAccountNumber = codesAndMessages['2005'];
    }
    if (codesAndMessages.hasOwnProperty('2006')) {
      this.incorrectPassword = codesAndMessages['2006'];
    }
    if (codesAndMessages.hasOwnProperty('2007')) {
      this.alreadyExistingAccountNumber = codesAndMessages['2007'];
    }
    if (codesAndMessages.hasOwnProperty('2008')) {
      this.passwordDoNotMatch = codesAndMessages['2008'];
    }
    if (codesAndMessages.hasOwnProperty('2009')) {
      this.registerDefaultError = codesAndMessages['2009'];
    }
    this.publish();
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
      const { message } = error.response.data;
      this.changeTransferState('FAIL', { errorMessage: message });
    }
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

  async fetchTransactions() {
    this.transactions = [];
    this.publish();

    this.transactions = await apiService.fetchTransactions();
    this.publish();
  }
}

export const bankStore = new BankStore();
