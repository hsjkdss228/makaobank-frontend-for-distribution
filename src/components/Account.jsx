import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';

import Container from './ui/Container';
import Heading from './ui/Heading';

import numberFormat from './utils/numberFormat';

const Information = styled.p`
  font-size: 1.25em;
  color: #A0A0A0;
  margin-bottom: 1.75em;
  span {
    font-weight: bold;
  }
`;

export default function Account() {
  const bankStore = useBankStore();

  return (
    <Container>
      <Heading>
        잔액확인
      </Heading>
      <Information>
        <span>이름</span>
        :
        {' '}
        {bankStore.name}
      </Information>
      <Information>
        <span>계좌번호</span>
        :
        {' '}
        {bankStore.accountNumber}
      </Information>
      <Information>
        <span>잔액</span>
        :
        {' '}
        {numberFormat(bankStore.amount)}
        원
      </Information>
    </Container>
  );
}
