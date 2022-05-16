import React, { useContext } from 'react';
import ChallengesContext from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';
import Cookies from 'js-cookie';

import DayNightToggle from 'react-day-and-night-toggle';

const Profile = ({ setIsDarkMode, toggleTheme, isDarkMode }) => {
  const { level } = useContext(ChallengesContext);



  return (
    <div className={styles.profileContainer}>
      <div>
        <img
          src="https://github.com/RodrigoFonsecaG.png"
          alt="Rodrigo Fonseca"
        />

        <div>
          <strong>Rodrigo Fonseca</strong>
          <p>
            <img src="icons/level.svg" alt="Level" />
            Level {level}
          </p>
        </div>
      </div>

      <DayNightToggle
        onChange={() => {
          setIsDarkMode(!isDarkMode);
          toggleTheme(isDarkMode);
        }}
        checked={isDarkMode}
        className={styles.toggleThemeButton}
      />
    </div>
  );
};

export default Profile;
