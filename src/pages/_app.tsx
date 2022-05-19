import '../styles/global.css';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { ThemeModeProvider } from '../contexts/ThemeModeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeModeProvider>
      <Component {...pageProps} />
    </ThemeModeProvider>
  );
}

export default MyApp;
