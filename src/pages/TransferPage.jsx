import { useState } from 'react';

export default function TransferPage() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input-account">
        받는 분 계좌번호:
      </label>
      <input
        id="input-account"
        type="text"
      />
      <p>
        하이픈(-) 제외 숫자 8글자를 입력하세요
      </p>
      <label htmlFor="input-amount">
        보낼금액(원):
      </label>
      <input
        id="input-amount"
        type="text"
      />
      <p>
        내 계좌 잔액: 456,000,000원
      </p>
      <label htmlFor="input-sender">
        받는 분 통장 표시:
      </label>
      <input
        id="input-sender"
        type="text"
      />
      <p>
        입금 받는 분의 통장에 표시될 이름을 입력하세요.
      </p>
      <button type="submit">
        보내기
      </button>
      {success
        ? (
          <p>계좌 이체에 성공했습니다.</p>
        ) : null}
    </form>
  );
}
