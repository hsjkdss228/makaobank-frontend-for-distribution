import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import ToggleThemeButton from './ui/ToggleThemeButton';
import HeaderButton from './ui/HeaderButton';

const Container = styled.header`
  width: 100%;
  padding: .7em;
  background: ${(props) => props.theme.colors.panel};
  display: flex;
  justify-content: space-around;
  nav {
    display: flex;
    justify-content: space-between;
    ul {
      display: flex;
      align-items: center;
    }
    li {
      font-size: .9em;
      margin-right: 4em;
    }
  }
`;

const Sessions = styled.div`
  * {
    margin-inline: .3em;
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
      </nav>
      <Sessions>
        <ToggleThemeButton
          type="button"
          onClick={toggleThemeButtonClick}
        />
        {accessToken ? (
          <HeaderButton
            type="button"
            onClick={handleLogout}
          >
            로그아웃
          </HeaderButton>
        ) : (
          <>
            <HeaderButton
              type="button"
              onClick={handleRegister}
            >
              회원가입
            </HeaderButton>
            <HeaderButton
              type="button"
              onClick={handleLogin}
            >
              로그인
            </HeaderButton>
          </>
        )}
      </Sessions>
    </Container>
  );
}
