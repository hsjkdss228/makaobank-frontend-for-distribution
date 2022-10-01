import { Link } from 'react-router-dom';

import styled from 'styled-components';

import NavigationButton from '../components/ui/NavigationButton';

import useBankStore from '../hooks/useBankStore';

import welcomeHeroImageUrl from '../assets/welcomeHero.jpeg';

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

const Information = styled.p`
  font-size: 1em;
  margin-bottom: 1em;
`;

const Heading = styled.h2`
  font-size: 2em;
  width: 9em;
  padding-bottom: .3em;
  margin-bottom: 1.2em;
  text-align: center;
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

const WelcomeHero = styled.div`
  position: absolute;
  top: 30%;
  left: 55%;
  width: 60vh;
  height: 51vh;
  border: none;
  background-color: transparent;
  background-image: url(${welcomeHeroImageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default function WelcomePage() {
  const bankStore = useBankStore();

  return (
    <>
      <Container>
        <Information>
          회원가입이 완료되었습니다.
        </Information>
        <Heading>
          환영합니다,
          {' '}
          {bankStore.createdUserName}
          {' '}
          님!
        </Heading>
        <Navigation>
          <ul>
            <li>
              <NavigationButton>
                <Link to="/">
                  홈으로
                </Link>
              </NavigationButton>
            </li>
            <li>
              <NavigationButton>
                <Link to="/login">
                  로그인하기
                </Link>
              </NavigationButton>
            </li>
          </ul>
        </Navigation>
      </Container>
      <WelcomeHero />
    </>
  );
}
