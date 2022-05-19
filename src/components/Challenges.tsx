import Head from 'next/head';
import React, { useContext } from 'react';
import ChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ThemeModeContext, ThemeModeProvider } from '../contexts/ThemeModeContext';
import styles from '../styles/pages/Home.module.css';

interface ChallengesProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

const Challenges = (props: ChallengesProps) => {
  // DARK/LIGHT MODE
  //const { theme, toggleTheme, setIsDarkModeState, isDarkModeState } = useTheme();


    const { theme, toggleTheme, isDarkModeState, setIsDarkModeState } =
      useContext(ThemeModeContext);


  return (
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>
          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile
                  setIsDarkMode={setIsDarkModeState}
                  toggleTheme={toggleTheme}
                  isDarkMode={isDarkModeState}
                />

                <CompletedChallenges />
                <Countdown />
              </div>

              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>

  );
};

export default Challenges;
