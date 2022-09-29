import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import numberFormat from './utils/numberFormat';

import useBankStore from '../hooks/useBankStore';

const Error = styled.div`
  color: #F00;  
`;

export default function TransferForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchAccount();
  }, []);

  const onSubmit = async (data) => {
    const { accountNumber, amount, sender } = data;
    await bankStore.requestTransfer({ to: accountNumber, amount, name: sender });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="input-accountNumber">
        받는 분 계좌번호:
      </label>
      <input
        id="input-accountNumber"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('accountNumber', { required: true })}
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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('amount', { required: true })}
        type="text"
      />
      {errors.amount ? (
        <Error>
          금액을 입력해 주세요
        </Error>
      ) : (
        <p>
          내 계좌 잔액:
          {' '}
          {numberFormat(bankStore.amount)}
          원
        </p>
      )}
      <label htmlFor="input-sender">
        받는 분 통장 표시:
      </label>
      <input
        id="input-sender"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('sender', { required: true })}
        type="text"
      />
      {errors.sender ? (
        <Error>
          입금 받는 분의 통장에 표시될 이름을 입력하세요.
        </Error>
      ) : (
        <p>
          입금 받는 분의 통장에 표시될 이름을 입력하세요.
        </p>
      )}
      <button
        type="submit"
        disabled={bankStore.isTransferProcessing}
      >
        보내기
      </button>
      {bankStore.isTransferProcessing
        ? (
          <p>송금 진행중...</p>
        ) : null}
      {bankStore.isTransferSuccess
        ? (
          <p>계좌 이체에 성공했습니다.</p>
        ) : null}
      {bankStore.isTransferFail
        ? (
          <Error>{bankStore.errorMessage}</Error>
        ) : null}
    </form>
  );
}
