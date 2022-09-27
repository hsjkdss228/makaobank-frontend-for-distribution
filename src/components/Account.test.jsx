import { render, screen } from '@testing-library/react';

import { bankStore } from '../stores/BankStore';

import Account from './Account';

test('Account', async () => {
  await bankStore.fetchAccount();

  render(<Account />);

  screen.getByText(/이름: 황인우/);
  screen.getByText(/계좌번호: 352/);
  screen.getByText(/잔액: 1,000,000원/);
});
