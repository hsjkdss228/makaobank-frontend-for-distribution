import AccountStore from './AccountStore';

describe('AccountStore', () => {
  it('모든 속성을 부여해 계좌 생성', () => {
    const bankStore = new AccountStore({
      name: '황인우',
      accountNumber: '352',
      amount: 1_000_000,
      transasctions: [],
    });

    expect(bankStore.name).toBe('황인우');
    expect(bankStore.accountNumber).toBe('352');
    expect(bankStore.amount).toBe(1_000_000);
    expect(bankStore.transactions).toEqual([]);
  });

  it('잔액을 부여하지 않고 계좌 생성', () => {
    const bankStore = new AccountStore({
      name: '김민수',
      accountNumber: '179',
      transasctions: [],
    });

    expect(bankStore.name).toBe('김민수');
    expect(bankStore.accountNumber).toBe('179');
    expect(bankStore.amount).toBe(0);
    expect(bankStore.transactions).toEqual([]);
  });

  it('거래내역을 부여하지 않고 계좌 생성', () => {
    const bankStore = new AccountStore({
      name: '홍길동',
      accountNumber: '110',
      amount: 1_000_000,
    });

    expect(bankStore.name).toBe('홍길동');
    expect(bankStore.accountNumber).toBe('110');
    expect(bankStore.amount).toBe(1_000_000);
    expect(bankStore.transactions).toEqual([]);
  });
});
