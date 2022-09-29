import { useEffect } from 'react';

import useBankStore from '../hooks/useBankStore';

import Account from '../components/Account';

export default function AccountPage() {
  const bankStore = useBankStore();

  useEffect(() => {
    console.log('fetch account');
    bankStore.fetchAccount();
  }, []);

  return (
    <Account />
  );
}
