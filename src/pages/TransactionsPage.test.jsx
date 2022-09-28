import { render, screen, waitFor } from '@testing-library/react';

import TransactionsPage from './TransactionsPage';

test('TransactionsPage', async () => {
  render(<TransactionsPage />);

  await waitFor(() => {
    screen.getByText(/거래 내역/);
    screen.getByText(/종류/);
    screen.getByText(/계좌번호/);
    screen.getByText(/금액/);
    screen.getByText(/3,000원/);
  });
});
