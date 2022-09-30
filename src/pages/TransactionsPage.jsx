import { useEffect } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import useBankStore from '../hooks/useBankStore';

import Transactions from '../components/Transactions';
import LoginForm from '../components/LoginForm';

export default function TransactionsPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchTransactions();
  }, []);

  return (
    accessToken ? (
      <Transactions />
    ) : (
      <LoginForm />
    )
  );
}
