import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import useBankStore from '../hooks/useBankStore';
import Container from './ui/Container';
import Form from './ui/Form';
import Heading from './ui/Heading';
import InputArea from './ui/InputArea';
import Input from './ui/Input';
import Error from './ui/Error';
import Information from './ui/Information';
import SubmitButton from './ui/SubmitButton';

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
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>SIGN UP</Heading>
        <InputArea>
          <label htmlFor="input-name">
            이름:
          </label>
          <Input
            hasError={
              bankStore.registerEmptyName
              || bankStore.registerIncorrectName
            }
            id="input-name"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('name')}
            type="text"
          />
          {bankStore.registerEmptyName ? (
            <Error>{bankStore.registerEmptyName}</Error>
          ) : bankStore.registerIncorrectName ? (
            <Error>{bankStore.registerIncorrectName}</Error>
          ) : (
            <Information>3~7자까지 한글만 사용 가능</Information>
          )}
        </InputArea>
        <InputArea>
          <label htmlFor="input-account-number">
            계좌번호 입력:
          </label>
          <Input
            hasError={
              bankStore.registerEmptyAccountNumber
              || bankStore.registerIncorrectAccountNumber
              || bankStore.registerAlreadyExistingAccountNumber
            }
            id="input-account-number"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('accountNumber')}
            type="text"
          />
          {bankStore.registerEmptyAccountNumber ? (
            <Error>{bankStore.registerEmptyAccountNumber}</Error>
          ) : bankStore.registerIncorrectAccountNumber ? (
            <Error>{bankStore.registerIncorrectAccountNumber}</Error>
          ) : bankStore.registerAlreadyExistingAccountNumber ? (
            <Error>{bankStore.registerAlreadyExistingAccountNumber}</Error>
          ) : (
            <Information>로그인 및 거래 시 사용될 계좌번호이며 숫자만 사용 가능 (8글자)</Information>
          )}
        </InputArea>
        <InputArea>
          <label htmlFor="input-password">
            비밀번호:
          </label>
          <Input
            hasError={
              bankStore.registerEmptyPassword
              || bankStore.registerIncorrectPassword
            }
            id="input-password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password')}
            type="password"
          />
          {bankStore.registerEmptyPassword ? (
            <Error>{bankStore.registerEmptyPassword}</Error>
          ) : bankStore.registerIncorrectPassword ? (
            <Error>{bankStore.registerIncorrectPassword}</Error>
          ) : (
            <Information>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</Information>
          )}
        </InputArea>
        <InputArea>
          <label htmlFor="input-confirm-password">
            비밀번호 확인:
          </label>
          <Input
            hasError={
              bankStore.registerEmptyConfirmPassword
              || bankStore.registerPasswordDoNotMatch
            }
            id="input-confirm-password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('confirmPassword')}
            type="password"
          />
          {bankStore.registerEmptyConfirmPassword ? (
            <Error>{bankStore.registerEmptyConfirmPassword}</Error>
          ) : bankStore.registerPasswordDoNotMatch ? (
            <Error>{bankStore.registerPasswordDoNotMatch}</Error>
          ) : null}
        </InputArea>
        <SubmitButton
          type="submit"
        >
          회원가입
        </SubmitButton>
      </Form>
    </Container>
  );
}
