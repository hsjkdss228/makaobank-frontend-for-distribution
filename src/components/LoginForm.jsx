import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useBankStore from '../hooks/useBankStore';

import Container from './ui/Container';
import Form from './ui/Form';
import Heading from './ui/Heading';
import Input from './ui/Input';
import Error from './ui/Error';
import Button from './ui/Button';

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  input:focus {
    outline: none;
  }
  label {
    font-size: 0;
    color: transparent;
  }
`;

const Information = styled.div`
  width: 97%;
  margin-top: 1em;
`;

const SubmitButton = styled(Button)`
  font-size: .7em;
  padding-block: 1em;
  margin-block: 3em;
  width: ${(props) => props.theme.size.buttonWidth};
  background: ${(props) => props.theme.colors.button};
  color: #FFF;
`;

const RegisterButton = styled.button`
  color: #FFF;
  background-color: transparent;
  border: none;
  cursor: pointer;
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
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>USER LOGIN</Heading>
        <InputArea>
          <label htmlFor="input-account-number">
            아이디(계좌번호)
          </label>
          <Input
            hasError={bankStore.loginEmptyAccountNumber}
            id="input-account-number"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('accountNumber')}
            type="text"
            placeholder="아이디(계좌번호)"
          />
        </InputArea>
        <InputArea>
          <label htmlFor="input-password">
            비밀번호
          </label>
          <Input
            id="input-password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password')}
            type="password"
            placeholder="비밀번호"
          />
        </InputArea>
        <Information>
          {bankStore.loginEmptyAccountNumber ? (
            <Error>{bankStore.loginEmptyAccountNumber}</Error>
          ) : bankStore.loginEmptyPassword ? (
            <Error>{bankStore.loginEmptyPassword}</Error>
          ) : bankStore.loginAccountNumberOrPasswordDoNotMatch ? (
            <Error>{bankStore.loginAccountNumberOrPasswordDoNotMatch}</Error>
          ) : null}
        </Information>
        <SubmitButton
          type="submit"
        >
          로그인하기
        </SubmitButton>
      </Form>
      <RegisterButton
        type="button"
        onClick={handleRegister}
      >
        회원가입
      </RegisterButton>
    </Container>
  );
}
