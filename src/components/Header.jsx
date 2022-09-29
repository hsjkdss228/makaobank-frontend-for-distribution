import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import ToggleThemeButton from './ui/ToggleThemeButton';

const Container = styled.header`
  width: 100%;
  padding: 1em;

  background: ${(props) => props.theme.colors.panel};

  nav {
    display: flex;
    justify-content: space-between;

    ul {
      display: flex;
      align-items: center;
      margin-left: 15%;
    }

    li {
      margin-right: 3em;
    }
  }
`;

export default function Header({ toggleThemeButtonClick }) {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/">
              홈
            </Link>
          </li>
          {accessToken ? (
            <>
              <li>
                <Link to="/account">
                  잔액확인
                </Link>
              </li>
              <li>
                <Link to="/transfer">
                  송금
                </Link>
              </li>
              <li>
                <Link to="/transactions">
                  거래내역
                </Link>
              </li>
            </>
          ) : null}
        </ul>
        <ToggleThemeButton
          type="button"
          onClick={toggleThemeButtonClick}
        />
        {accessToken ? (
          <button
            type="button"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleRegister}
            >
              회원가입
            </button>
            <button
              type="button"
              onClick={handleLogin}
            >
              로그인
            </button>
          </>

        )}

      </nav>
    </Container>
  );
}
