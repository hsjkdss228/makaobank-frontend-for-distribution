export default function TransactionsPage() {
  return (
    <div>
      <h2>거래 내역</h2>
      <table>
        <thead>
          <tr>
            <th>종류</th>
            <th>계좌번호</th>
            <th>금액(원)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>송금</td>
            <td>179</td>
            <td>10,000원</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
