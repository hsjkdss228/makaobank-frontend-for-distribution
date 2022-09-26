import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import TransferPage from './pages/TransferPage';
import TransactionsPage from './pages/TransactionsPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </div>
  );
}
