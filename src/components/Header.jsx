import { Link } from 'react-router-dom';

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
      margin-left: 10em;
    }

    li {
      margin-right: 3em;
    }
  }
`;

export default function Header({ toggleThemeButtonClick }) {
  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/">
              홈
            </Link>
          </li>
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
        </ul>
        <ToggleThemeButton
          type="button"
          onClick={toggleThemeButtonClick}
        />
      </nav>
    </Container>
  );
}
