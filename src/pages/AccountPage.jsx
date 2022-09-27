import { useEffect } from 'react';

import useBankStore from '../hooks/useBankStore';

import Account from '../components/Account';

export default function AccountPage() {
  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchAccount();
  }, []);

  return (
    <Account />
  );
}
