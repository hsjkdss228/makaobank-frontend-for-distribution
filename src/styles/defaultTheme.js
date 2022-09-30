import toggleThemeImageUrl from '../assets/iconDarkMode.png';
import heroImageUrl from '../assets/hero.png';

const defaultTheme = {
  colors: {
    background: '#FFF',
    text: '#000',
    panel: 'linear-gradient(269.99deg, #A79FFF 0.01%, #F29FFF 99.99%)',
    button: '#A79FFF',
  },
  size: {
    buttonWidth: '25.5em',
  },
  icon: {
    toggleButtonImage: toggleThemeImageUrl,
  },
  image: {
    heroImage: heroImageUrl,
  },
};

export default defaultTheme;
