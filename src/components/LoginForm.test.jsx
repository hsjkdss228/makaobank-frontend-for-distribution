import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import LoginForm from './LoginForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // useNavigate: () => navigate,
  useNavigate() {
    return navigate;
  },
}));

describe('LoginForm', () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it('로그인 폼 입력 후 로그인하기 버튼 클릭', async () => {
    screen.getByRole('heading', { name: 'USER LOGIN' });

    fireEvent.change(screen.getByLabelText('아이디(계좌번호)'), {
      target: { value: '352' },
    });
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

    await waitFor(() => {
      expect(navigate).toBeCalledWith('/');
    });
  });

  it('회원가입 버튼 클릭', async () => {
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

    await waitFor(() => {
      expect(navigate).toBeCalledWith('/register');
    });
  });
});
