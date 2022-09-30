import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Reset } from 'styled-reset';

import { ThemeProvider } from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

import GlobalStyle from './styles/GlobalStyle';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import AccountPage from './pages/AccountPage';
import TransferPage from './pages/TransferPage';
import TransactionsPage from './pages/TransactionsPage';

import { apiService } from './services/ApiService';

import defaultTheme from './styles/defaultTheme';
import darkTheme from './styles/darkTheme';

export default function App() {
  const [themeName, setThemeName] = useLocalStorage('theme', 'default');
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  const toggleTheme = () => {
    setThemeName(themeName === 'default' ? 'dark' : 'default');
  };

  const theme = themeName === 'dark' ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Header
        toggleThemeButtonClick={toggleTheme}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </ThemeProvider>
  );
}
