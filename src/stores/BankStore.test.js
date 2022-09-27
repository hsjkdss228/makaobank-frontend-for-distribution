import BankStore from './BankStore';

const context = describe;

describe('BankStore', () => {
  describe('Login', () => {
    context('올바른 계좌번호와 비밀번호인 경우', () => {
      it('내 계좌 정보를 불러옴', () => {
        const bankStore = new BankStore();

        bankStore.login({ accountNumber: '352', password: 'password' });

        expect(bankStore.name).toBe('황인우');
        expect(bankStore.amount).toBe(1_000_000);
      });
    });

    context('계좌번호가 올바르지 않은 경우', () => {
      it('계좌 정보를 불러오지 않음', () => {
        const bankStore = new BankStore();

        bankStore.login({ accountNumber: 'wrong', password: 'password' });

        expect(bankStore.name).toBeFalsy();
        expect(bankStore.amount).toBeFalsy();
      });
    });

    context('비밀번호가 올바르지 않은 경우', () => {
      it('계좌 정보를 불러오지 않음', () => {
        const bankStore = new BankStore();

        bankStore.login({ accountNumber: '352', password: 'wrong' });

        expect(bankStore.name).toBeFalsy();
        expect(bankStore.amount).toBeFalsy();
      });
    });
  });
});
