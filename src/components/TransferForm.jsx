import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import numberFormat from './utils/numberFormat';

import useBankStore from '../hooks/useBankStore';

import Container from './ui/Container';
import Form from './ui/Form';
import Heading from './ui/Heading';
import InputArea from './ui/InputArea';
import Input from './ui/Input';
import Error from './ui/Error';
import Information from './ui/Information';
import SubmitButton from './ui/SubmitButton';

const Result = styled.div`
  margin-top: 1.5em;
`;

export default function TransferForm() {
  const { register, handleSubmit } = useForm();

  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchAccount();
    bankStore.changeTransferState('');
  }, []);

  const onSubmit = async (data) => {
    const { accountNumber, amount, sender } = data;
    await bankStore.requestTransfer({ to: accountNumber, amount, name: sender });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>송금</Heading>
        <InputArea>
          <label htmlFor="input-account-number">
            받는 분 계좌번호:
          </label>
          <Input
            id="input-account-number"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('accountNumber')}
            type="text"
          />
          {bankStore.transferEmptyAccountNumber ? (
            <Error>{bankStore.transferEmptyAccountNumber}</Error>
          ) : bankStore.transferAccountNotFound ? (
            <Error>{bankStore.transferAccountNotFound}</Error>
          ) : bankStore.transferToMyAccount ? (
            <Error>{bankStore.transferToMyAccount}</Error>
          ) : (
            <Information>하이픈(-) 제외 숫자 8글자를 입력하세요</Information>
          )}
        </InputArea>
        <InputArea>
          <label htmlFor="input-amount">
            보낼금액(원):
          </label>
          <Input
            id="input-amount"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('amount')}
            type="text"
          />
          {bankStore.transferEmptyAmount ? (
            <Error>{bankStore.transferEmptyAmount}</Error>
          ) : bankStore.transferIncorrectAmount ? (
            <Error>{bankStore.transferIncorrectAmount}</Error>
          ) : bankStore.transferInsufficientAmount ? (
            <Error>{bankStore.transferInsufficientAmount}</Error>
          ) : (
            <Information>
              내 계좌 잔액:
              {' '}
              {numberFormat(bankStore.amount)}
              원
            </Information>
          )}
        </InputArea>
        <InputArea>
          <label htmlFor="input-sender">
            받는 분 통장 표시:
          </label>
          <Input
            id="input-sender"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('sender')}
            type="text"
          />
          {bankStore.transferEmptyName ? (
            <Error>{bankStore.transferEmptyName}</Error>
          ) : (
            <Information>입금 받는 분의 통장에 표시될 이름을 입력하세요.</Information>
          )}
        </InputArea>
        <SubmitButton
          type="submit"
          disabled={bankStore.isTransferProcessing}
        >
          보내기
        </SubmitButton>
        <Result>
          {bankStore.isTransferProcessing ? (
            <Information>송금 진행중...</Information>
          ) : bankStore.isTransferSuccess ? (
            <Information>계좌 이체에 성공했습니다.</Information>
          ) : bankStore.isTransferFail ? (
            <Error>계좌 이체에 실패했습니다.</Error>
          ) : null}
        </Result>
      </Form>
    </Container>
  );
}
