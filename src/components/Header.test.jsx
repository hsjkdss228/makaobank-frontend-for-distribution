import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';

import Header from './Header';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

describe('Header', () => {
  function renderHeader() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <Header />
      </ThemeProvider>
    ));
  }

  it('홈 링크는 화면에 상시 표시', () => {
    renderHeader();

    screen.getByText(/홈/);
  });

  context('로그인 상태일 때', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('메뉴 링크, 로그아웃 버튼이 화면에 표시', () => {
      renderHeader();

      screen.getByText(/잔액확인/);
      screen.getByText(/송금/);
      screen.getByText(/거래내역/);
      screen.getByText(/로그아웃/);
    });

    context('로그아웃 버튼을 클릭했을 때', () => {
      it('홈 링크로 리다이렉트됨', () => {
        renderHeader();

        fireEvent.click(screen.getByText(/로그아웃/));

        expect(navigate).toBeCalledWith('/');
      });
    });
  });

  context('로그인 상태가 아닐 때', () => {
    beforeEach(() => {
      // localStorage.setItem('accessToken', JSON.stringify(''));
      localStorage.removeItem('accessToken');
    });

    it('회원가입 버튼, 로그인 버튼이 화면에 표시', () => {
      renderHeader();

      screen.getByText(/회원가입/);
      screen.getByText(/로그인/);
    });

    context('로그인 버튼을 클릭했을 때', () => {
      it('로그인 링크로 리다이렉트됨', () => {
        renderHeader();

        fireEvent.click(screen.getByText(/로그인/));

        expect(navigate).toBeCalledWith('/login');
      });
    });

    context('회원가입 버튼을 클릭했을 때', () => {
      it('회원가입 링크로 리다이렉트됨', () => {
        renderHeader();

        fireEvent.click(screen.getByText(/회원가입/));

        expect(navigate).toBeCalledWith('/register');
      });
    });
  });
});
