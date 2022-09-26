import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.header`
  width: 100%;
  padding: 1em;

  background: linear-gradient(269.99deg, #A79FFF 0.01%, #F29FFF 99.99%);

  nav {
    ul {
      display: flex;
      margin-left: 10em;
    }

    li {
      margin-right: 3em;
    }
  }
`;

export default function Header() {
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
      </nav>
    </Container>
  );
}
