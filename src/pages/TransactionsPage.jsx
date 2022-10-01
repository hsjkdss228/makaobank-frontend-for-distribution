import { useEffect } from 'react';

import useBankStore from '../hooks/useBankStore';

import Transactions from '../components/Transactions';

export default function TransactionsPage() {
  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchTransactions();
  }, []);

  return (
    <Transactions />
  );
}
