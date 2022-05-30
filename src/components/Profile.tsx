import React, { useContext } from 'react';
import ChallengesContext from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

import DayNightToggle from 'react-day-and-night-toggle';

const Profile = ({ setIsDarkMode, toggleTheme, isDarkMode, session }) => {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      {session && (
        <>
          <div>
            <img
              src={session.user.image}
              alt={session.user.name}
            />

            <div>
              <strong>{session.user.name}</strong>
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
        </>
      )}
    </div>
  );
};

export default Profile;
