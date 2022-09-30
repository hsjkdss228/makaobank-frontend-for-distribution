/* eslint-disable no-nested-ternary */

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

const Label = styled.label`
  font-size: 0;
  color: transparent;
`;

const Error = styled.p`
  color: #F00;  
`;

export default function LoginForm() {
  // const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const bankStore = useBankStore();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { accountNumber, password } = data;
    const accessToken = await bankStore.login({ accountNumber, password });
    if (accessToken) {
      bankStore.clearLoginState();
      setAccessToken(accessToken);
      navigate('/');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>USER LOGIN</h2>
        <div>
          <Label htmlFor="input-account-number">
            아이디(계좌번호)
          </Label>
          <input
            id="input-account-number"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('accountNumber')}
            type="text"
            placeholder="아이디(계좌번호)"
          />
        </div>
        <div>
          <Label htmlFor="input-password">
            비밀번호
          </Label>
          <input
            id="input-password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password')}
            type="password"
            placeholder="비밀번호"
          />
        </div>
        {bankStore.loginEmptyAccountNumber ? (
          <Error>{bankStore.loginEmptyAccountNumber}</Error>
        ) : bankStore.loginEmptyPassword ? (
          <Error>{bankStore.loginEmptyPassword}</Error>
        ) : bankStore.loginAccountNumberOrPasswordDoNotMatch ? (
          <Error>{bankStore.loginAccountNumberOrPasswordDoNotMatch}</Error>
        ) : null}
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
