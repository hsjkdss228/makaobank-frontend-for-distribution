import { render, screen } from '@testing-library/react';

import Header from './Header';

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

test('Header', () => {
  render(<Header />);

  screen.getByText(/홈/);
  screen.getByText(/잔액확인/);
  screen.getByText(/송금/);
  screen.getByText(/거래내역/);
});
