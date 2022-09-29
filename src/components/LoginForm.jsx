import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

const Label = styled.label`
  font-size: 0;
  color: transparent;
`;

const Error = styled.div`
  color: #F00;  
`;

export default function LoginForm() {
  // const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const bankStore = useBankStore();

  const { register, handleSubmit, formState: { isDirty, errors } } = useForm();

  const onSubmit = async (data) => {
    const { accountNumber, password } = data;
    const accessToken = await bankStore.login({ accountNumber, password });
    if (accessToken) {
      setAccessToken(accessToken);
      navigate('/');
    }
  };

  const showErrorMessage = ({ blankAccountNumber, blankPassword }) => {
    if (blankAccountNumber) {
      return (
        <Error>
          아이디를 입력해주세요
        </Error>
      );
    }
    if (blankPassword) {
      return (
        <Error>
          비밀번호를 입력해주세요
        </Error>
      );
    }
    if (bankStore.isLoginFailed) {
      return (
        <Error>
          {bankStore.errorMessage}
        </Error>
      );
    }
    return null;
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>USER LOGIN</h2>
        <Label htmlFor="input-accountNumber">
          아이디(계좌번호)
        </Label>
        <input
          id="input-accountNumber"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('accountNumber', { required: true })}
          type="text"
          placeholder="아이디(계좌번호)"
        />
        <Label htmlFor="input-password">
          비밀번호
        </Label>
        <input
          id="input-password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password', { required: true })}
          type="password"
          placeholder="비밀번호"
        />
        {!isDirty ? showErrorMessage({
          blankAccountNumber: errors.accountNumber,
          blankPassword: errors.password,
        }) : null}
        <button
          type="submit"
        >
          로그인하기
        </button>
      </form>
      <button
        type="button"
        onClick={handleRegister}
      >
        회원가입
      </button>
    </div>
  );
}
