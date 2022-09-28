import { waitFor } from '@testing-library/react';
import BankStore from './BankStore';

const context = describe;

describe('BankStore', () => {
  let bankStore;

  beforeEach(() => {
    bankStore = new BankStore();
  });

  describe('Login', () => {
    context('올바른 계좌번호와 비밀번호인 경우', () => {
      it('내 계좌 정보를 불러옴', async () => {
        // console.log('로그인 시도 (jest)');
        await bankStore.login({ accountNumber: '352', password: 'password' });

        // console.log('검증 수행 (jest)');
        expect(bankStore.name).toBe('황인우');
        expect(bankStore.amount).toBe(1_000_000);
      });
    });

    context('계좌번호가 올바르지 않은 경우', () => {
      it('계좌 정보를 불러오지 않음', async () => {
        await bankStore.login({ accountNumber: 'wrong', password: 'password' });

        expect(bankStore.name).toBeFalsy();
        expect(bankStore.amount).toBeFalsy();
      });
    });

    context('비밀번호가 올바르지 않은 경우', () => {
      it('계좌 정보를 불러오지 않음', async () => {
        await bankStore.login({ accountNumber: '352', password: 'wrong' });

        expect(bankStore.name).toBeFalsy();
        expect(bankStore.amount).toBeFalsy();
      });
    });
  });

  describe('fetchAccount', () => {
    it('응답으로 받은 계좌 정보를 세팅', async () => {
      await bankStore.fetchAccount();

      expect(bankStore.name).toBe('황인우');
      expect(bankStore.accountNumber).toBe('352');
      expect(bankStore.amount).toBe(1_000_000);
    });
  });

  describe('requestTransfer', () => {
    context('요청이 성공했을 때', () => {
      async function requestRightTransfer() {
        await bankStore.requestTransfer({
          to: '179',
          amount: 100,
          name: '흥인우',
        });
      }

      it('송금 상태를 PROCESSING을 거쳐 SUCCESS로 변환', async () => {
        requestRightTransfer();

        // PROCESSING
        // console.log(`state: ${bankStore.transferState}`);
        expect(bankStore.isTransferProcessing).toBeTruthy();

        // Fail까지 기다림
        await waitFor(() => {
          expect(bankStore.isTransferSuccess).toBeTruthy();
        });
      });

      it('에러 메세지를 설정하지 않음', async () => {
        await requestRightTransfer();

        expect(bankStore.errorMessage).toBeFalsy();
      });
    });

    context('요청이 살패했을 때', () => {
      async function requestWrongTransfer() {
        await bankStore.requestTransfer({
          to: '179',
          amount: -1000000,
          name: '흥인우',
        });
      }

      it('송금 상태를 PROCESSING을 거쳐 FAIL로 변환', async () => {
        requestWrongTransfer();

        // PROCESSING
        // console.log(`state: ${bankStore.transferState}`);
        expect(bankStore.isTransferProcessing).toBeTruthy();

        // Fail까지 기다림
        await waitFor(() => {
          expect(bankStore.isTransferFail).toBeTruthy();
        });
      });

      it('에러 메세지를 설정', async () => {
        await requestWrongTransfer();

        expect(bankStore.errorMessage).toBeTruthy();
      });
    });
  });
});
