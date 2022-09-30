/* eslint-disable no-nested-ternary */

import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

const Error = styled.p`
  // outline: none;
  color: #F00;
`;

export default function LoginForm() {
  const navigate = useNavigate();

  const bankStore = useBankStore();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const {
      name, accountNumber, password, confirmPassword,
    } = data;
    const createdUserName = await bankStore.register({
      name, accountNumber, password, confirmPassword,
    });

    if (createdUserName) {
      bankStore.clearRegisterState();
      navigate('/welcome');
    }
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
        {!bankStore.registerEmptyName && !bankStore.registerIncorrectName ? (
          <p>3~7자까지 한글만 사용 가능</p>
        ) : bankStore.registerEmptyName ? (
          <Error>{bankStore.registerEmptyName}</Error>
        ) : (
          <Error>{bankStore.registerIncorrectName}</Error>
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
        {!bankStore.registerEmptyAccountNumber && !bankStore.registerIncorrectAccountNumber ? (
          <p>로그인 및 거래 시 사용될 계좌번호이며 숫자만 사용 가능 (8글자)</p>
        ) : bankStore.registerEmptyAccountNumber ? (
          <Error>{bankStore.registerEmptyAccountNumber}</Error>
        ) : bankStore.registerIncorrectAccountNumber ? (
          <Error>{bankStore.registerIncorrectAccountNumber}</Error>
        ) : (
          <Error>{bankStore.registerAlreadyExistingAccountNumber}</Error>
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
        {!bankStore.registerEmptyPassword && !bankStore.registerIncorrectPassword ? (
          <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</p>
        ) : bankStore.registerEmptyPassword ? (
          <Error>{bankStore.registerEmptyPassword}</Error>
        ) : (
          <Error>{bankStore.registerIncorrectPassword}</Error>
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
        {bankStore.registerEmptyConfirmPassword ? (
          <Error>{bankStore.registerEmptyConfirmPassword}</Error>
        ) : (
          <Error>{bankStore.registerPasswordDoNotMatch}</Error>
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
