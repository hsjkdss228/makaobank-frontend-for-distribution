/* eslint-disable no-nested-ternary */
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

const Error = styled.p`
  // outline: none;
  color: #F00;
`;

export default function LoginForm() {
  const bankStore = useBankStore();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const {
      name, accountNumber, password, confirmPassword,
    } = data;
    await bankStore.register({
      name, accountNumber, password, confirmPassword,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>SIGN UP</h2>
      <div>
        <label htmlFor="input-name">
          이름:
        </label>
        <input
          id="input-name"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('name')}
          type="text"
        />
        {!bankStore.emptyName && !bankStore.incorrectName ? (
          <p>3~7자까지 한글만 사용 가능</p>
        ) : bankStore.emptyName ? (
          <Error>{bankStore.emptyName}</Error>
        ) : (
          <Error>{bankStore.incorrectName}</Error>
        )}
      </div>
      <div>
        <label htmlFor="input-account-number">
          계좌번호 입력:
        </label>
        <input
          id="input-account-number"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('accountNumber')}
          type="text"
        />
        {!bankStore.emptyAccountNumber && !bankStore.incorrectAccountNumber ? (
          <p>로그인 및 거래 시 사용될 계좌번호이며 숫자만 사용 가능 (8글자)</p>
        ) : bankStore.emptyAccountNumber ? (
          <Error>{bankStore.emptyAccountNumber}</Error>
        ) : bankStore.incorrectAccountNumber ? (
          <Error>{bankStore.incorrectAccountNumber}</Error>
        ) : (
          <Error>{bankStore.alreadyExistingAccountNumber}</Error>
        )}
      </div>
      <div>
        <label htmlFor="input-password">
          비밀번호:
        </label>
        <input
          id="input-password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password')}
          type="password"
        />
        {!bankStore.emptyPassword && !bankStore.incorrectPassword ? (
          <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</p>
        ) : bankStore.emptyPassword ? (
          <Error>{bankStore.emptyPassword}</Error>
        ) : (
          <Error>{bankStore.incorrectPassword}</Error>
        )}
      </div>
      <div>
        <label htmlFor="input-confirm-password">
          비밀번호 확인:
        </label>
        <input
          id="input-confirm-password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('confirmPassword')}
          type="password"
        />
        {bankStore.emptyConfirmPassword ? (
          <Error>{bankStore.emptyConfirmPassword}</Error>
        ) : (
          <Error>{bankStore.passwordDoNotMatch}</Error>
        )}
      </div>
      <button
        type="submit"
      >
        회원가입
      </button>
    </form>
  );
}
