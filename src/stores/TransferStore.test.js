import TransferStore from './TransferStore';

const context = describe;

describe('TransferStore', () => {
  context('송금액이 정상일 때', () => {
    it('잔액을 갱신', () => {
      const transferStore = new TransferStore();

      expect(transferStore.amount('352')).toBe(10_000);
      expect(transferStore.amount('179')).toBe(2_000);

      transferStore.transfer('352', '179', 1_000);

      expect(transferStore.amount('352')).toBe(9_000);
      expect(transferStore.amount('179')).toBe(3_000);
    });
  });

  context('송금액이 잔액보다 클 때', () => {
    it('잔액을 갱신하지 않음', () => {
      const transferStore = new TransferStore();

      expect(transferStore.amount('352')).toBe(10_000);
      expect(transferStore.amount('179')).toBe(2_000);

      transferStore.transfer('352', '179', 1_000_000);

      expect(transferStore.amount('352')).toBe(10_000);
      expect(transferStore.amount('179')).toBe(2_000);
    });
  });
});
