import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

const Label = styled.label`
  font-size: 0;
  color: transparent;
`;

export default function LoginForm() {
  // const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const bankStore = useBankStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { accountNumber, password } = data;
    const accessToken = await bankStore.login({ accountNumber, password });
    if (accessToken) {
      setAccessToken(accessToken);
      navigate('/');
    }
  };

  return (
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
      <button
        type="submit"
      >
        로그인하기
      </button>
      <button
        type="button"
        onClick={navigate('/register')}
      >
        회원가입
      </button>
    </form>
  );
}
