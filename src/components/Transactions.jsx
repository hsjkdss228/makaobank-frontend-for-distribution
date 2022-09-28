import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';

import numberFormat from './utils/numberFormat';

const Table = styled.table`
  td {
    padding: .5em 3em;
  }
`;

export default function Transactions() {
  const bankStore = useBankStore();

  const { transactions } = bankStore;

  return (
    <div>
      <h2>거래 내역</h2>
      <Table>
        <thead>
          <tr>
            <th>종류</th>
            <th>계좌번호</th>
            <th>금액(원)</th>
          </tr>
        </thead>
        <tbody>
          {!transactions.length ? (
            <tr>
              <td>거래내역이 없습니다.</td>
            </tr>
          ) : (transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.activity}</td>
              <td>{transaction.name}</td>
              <td>
                {numberFormat(transaction.amount)}
                원
              </td>
            </tr>
          )))}
        </tbody>
      </Table>
    </div>
  );
}
