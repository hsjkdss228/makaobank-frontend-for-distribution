import { useLocalStorage } from 'usehooks-ts';

import { Routes, Route } from 'react-router-dom';

import { Reset } from 'styled-reset';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import TransferPage from './pages/TransferPage';
import TransactionsPage from './pages/TransactionsPage';

import defaultTheme from './styles/defaultTheme';
import darkTheme from './styles/darkTheme';

import { bankStore } from './stores/BankStore';

export default function App() {
  const [themeName, setThemeName] = useLocalStorage('theme', 'default');

  const toggleTheme = () => {
    setThemeName(themeName === 'default' ? 'dark' : 'default');
  };

  const login = () => {
    bankStore.login({ accountNumber: '352', password: 'password' });
  };

  const theme = themeName === 'dark' ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Header
        toggleThemeButtonClick={toggleTheme}
        handleLogin={login}
      />
      <Routes>
        <Route path="/" element={<HomePage handleLogin={login} />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </ThemeProvider>
  );
}
