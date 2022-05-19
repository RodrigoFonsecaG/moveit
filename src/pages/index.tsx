import GlobalStyle from '../styles/Global';
import { ThemeProvider } from 'styled-components';

import { GetServerSideProps } from 'next';
import Challenges from '../components/Challenges';
import { useContext } from 'react';
import { ThemeModeContext } from '../contexts/ThemeModeContext';


export default function Home(props) {
  const { theme } = useContext(ThemeModeContext);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <Challenges {...props} />
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  };
};
