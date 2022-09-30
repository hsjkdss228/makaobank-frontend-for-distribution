import { useEffect } from 'react';

import useBankStore from '../hooks/useBankStore';

import Transactions from '../components/Transactions';

export default function TransactionsPage() {
  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchTransactions();
  }, []);

  // TODO: 로그인 안되어있으면 로그인 페이지로 보내야 함

  return (
    <Transactions />
  );
}
