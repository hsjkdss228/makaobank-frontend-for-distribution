/* eslint-disable no-prototype-builtins */
import { apiService } from '../services/ApiService';

export default class BankStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.accountNumber = '';
    this.amount = 0;
    this.transactions = [];

    this.loginEmptyAccountNumber = '';
    this.loginEmptyPassword = '';
    this.loginAccountNumberOrPasswordDoNotMatch = '';

    this.registerEmptyName = '';
    this.registerEmptyAccountNumber = '';
    this.registerEmptyPassword = '';
    this.registerEmptyConfirmPassword = '';
    this.registerIncorrectName = '';
    this.registerIncorrectAccountNumber = '';
    this.registerIncorrectPassword = '';
    this.registerAlreadyExistingAccountNumber = '';
    this.registerPasswordDoNotMatch = '';
    this.registerDefaultError = '';

    this.createdUserName = '';

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
      const { code, message } = error.response.data;
      this.changeLoginState({ code, message });
      return '';
    }
  }

  clearLoginState() {
    this.loginEmptyAccountNumber = '';
    this.loginEmptyPassword = '';
    this.loginAccountNumberOrPasswordDoNotMatch = '';
  }

  changeLoginState({ code, message }) {
    this.clearLoginState();

    if (code === 1000) {
      this.loginEmptyAccountNumber = message;
    }
    if (code === 1001) {
      this.loginEmptyPassword = message;
    }
    if (code === 1002) {
      this.loginAccountNumberOrPasswordDoNotMatch = message;
    }

    this.publish();
  }

  async register({
    name, accountNumber, password, confirmPassword,
  }) {
    try {
      this.createdUserName = await apiService.register({
        name, accountNumber, password, confirmPassword,
      });

      return this.createdUserName;
    } catch (error) {
      const { codesAndMessages } = error.response.data;
      // console.log(typeof error.response.data.codesAndMessages);
      this.changeRegisterState(codesAndMessages);
      return '';
    }
  }

  clearRegisterState() {
    this.registerEmptyName = '';
    this.registerEmptyAccountNumber = '';
    this.registerEmptyPassword = '';
    this.registerEmptyConfirmPassword = '';
    this.registerIncorrectName = '';
    this.registerIncorrectAccountNumber = '';
    this.registerIncorrectPassword = '';
    this.registerAlreadyExistingAccountNumber = '';
    this.registerPasswordDoNotMatch = '';
    this.registerDefaultError = '';
  }

  changeRegisterState(codesAndMessages) {
    this.clearRegisterState();

    if (codesAndMessages.hasOwnProperty('2000')) {
      this.registerEmptyName = codesAndMessages['2000'];
    }
    if (codesAndMessages.hasOwnProperty('2001')) {
      this.registerEmptyAccountNumber = codesAndMessages['2001'];
    }
    if (codesAndMessages.hasOwnProperty('2002')) {
      this.registerEmptyPassword = codesAndMessages['2002'];
    }
    if (codesAndMessages.hasOwnProperty('2003')) {
      this.registerEmptyConfirmPassword = codesAndMessages['2003'];
    }
    if (codesAndMessages.hasOwnProperty('2004')) {
      this.registerIncorrectName = codesAndMessages['2004'];
    }
    if (codesAndMessages.hasOwnProperty('2005')) {
      this.registerIncorrectAccountNumber = codesAndMessages['2005'];
    }
    if (codesAndMessages.hasOwnProperty('2006')) {
      this.registerIncorrectPassword = codesAndMessages['2006'];
    }
    if (codesAndMessages.hasOwnProperty('2007')) {
      this.registerAlreadyExistingAccountNumber = codesAndMessages['2007'];
    }
    if (codesAndMessages.hasOwnProperty('2008')) {
      this.registerPasswordDoNotMatch = codesAndMessages['2008'];
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
