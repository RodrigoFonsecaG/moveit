import '../styles/global.css';
import { ThemeModeProvider } from '../contexts/ThemeModeContext';
import {SessionProvider} from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <ThemeModeProvider>
        <Component {...pageProps} />
      </ThemeModeProvider>
    </SessionProvider>
  );
}

export default MyApp;
