import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';
import Container from './ui/Container';
import Heading from './ui/Heading';

import numberFormat from './utils/numberFormat';

const Table = styled.table`
  td {
    padding: .5em 3em;
  }
`;

const TableHead = styled.tr`
  background-color: #A79FFF;
  th:first-child {
    padding: 1.5em 2em;
    border: 1px solid #D8D8D8;
    border-left: none;
  }
  th:nth-child(2) {
    padding: 1.5em 8em;
    border: 1px solid #D8D8D8;
  }
  th:last-child {
    padding: 1.5em 2em;
    border: 1px solid #D8D8D8;
    border-right: none;
  }
`;

const EmptyTableBody = styled.tr`
  border-bottom: 1px solid #D8D8D8;
  color: #A0A0A0;
  td:nth-child(2) {
    text-align: center;
    padding-block: 2em;
  }
`;

const TableBody = styled.tr`
  text-align: center;
  color: #A0A0A0;
  td:first-child {
    padding: 1.5em 2em;
    border: 1px solid #D8D8D8;
    border-left: none;
  }
  td:nth-child(2) {
    padding: 1.5em 8em;
    border: 1px solid #D8D8D8;
  }
  td:last-child {
    padding: 1.5em 2em;
    border: 1px solid #D8D8D8;
    border-right: none;
  }
`;

export default function Transactions() {
  const bankStore = useBankStore();

  const { transactions } = bankStore;

  return (
    <Container>
      <Heading>거래 내역</Heading>
      <Table>
        <thead>
          <TableHead>
            <th>종류</th>
            <th>계좌번호</th>
            <th>금액(원)</th>
          </TableHead>
        </thead>
        <tbody>
          {!transactions.length ? (
            <EmptyTableBody>
              <td />
              <td>거래내역이 없습니다.</td>
              <td />
            </EmptyTableBody>
          ) : (transactions.map((transaction) => (
            <TableBody key={transaction.id}>
              <td>{transaction.activity}</td>
              <td>{transaction.name}</td>
              <td>
                {numberFormat(transaction.amount)}
                원
              </td>
            </TableBody>
          )))}
        </tbody>
      </Table>
    </Container>
  );
}
