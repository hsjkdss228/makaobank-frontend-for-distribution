import { useLocalStorage } from 'usehooks-ts';

import LoginForm from '../components/LoginForm';
import TransferForm from '../components/TransferForm';

export default function TransferPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  return (
    accessToken ? (
      <TransferForm />
    ) : (
      <LoginForm />
    )
  );
}
