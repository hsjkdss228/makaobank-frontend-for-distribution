import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import NavigationButton from '../components/ui/NavigationButton';
import Hero from '../components/ui/Hero';

const Container = styled.article`
  height: 90vh;
  min-width: 1024px;
  max-width: 1440px;
  min-height: 100%;
  padding: 0 15%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: center;
`;

const Welcome = styled.p`
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: .5em;
`;

const Navigation = styled.nav`
  margin-top: 1em;
  ul {
    display: flex;
    li {
      margin-right: 1em;
    }
  }
`;

export default function HomePage() {
  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const handleTransferClick = () => (
    accessToken ? navigate('/transfer') : navigate('/login')
  );

  const handleTransactionsClick = () => (
    accessToken ? navigate('/transactions') : navigate('/login')
  );

  return (
    <>
      <Container>
        <Welcome>
          마카오뱅크에서
        </Welcome>
        <Welcome>촉촉한 금융습관을 들이세요</Welcome>
        <Navigation>
          <ul>
            <li>
              <NavigationButton
                type="button"
                onClick={handleTransferClick}
              >
                송금하기
              </NavigationButton>
            </li>
            <li>
              <NavigationButton
                type="button"
                onClick={handleTransactionsClick}
              >
                거래내역조회
              </NavigationButton>
            </li>
          </ul>
        </Navigation>
      </Container>
      <Hero />
    </>
  );
}
