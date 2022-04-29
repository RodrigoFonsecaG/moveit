import React, { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

const Countdown = () => {
  // 25 min em segundos
  const [time, setTime] = useState(25 * 60);

  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // 25 vira '25' que vira '2' '5'
  // 5 vira '5' que vira '05' devido ao padstart e vira '0' '5'
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setActive(true);
    }
    
    useEffect(() => {
          if (active && time > 0) {
            setTimeout(() => {
              setTime(time - 1);
            }, 1000);
          }
        
    }, [active, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
};

export default Countdown;
