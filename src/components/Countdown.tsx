import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

import Play from '../../public/icons/play.svg';
import Close from '../../public/icons/close.svg'
import Check from '../../public/icons/check.svg';
import ChallengesContext from '../contexts/ChallengesContext';

const Countdown = () => {

  const {startNewChallenge} = useContext(ChallengesContext);


  // 25 min em segundos
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;


  // 25 vira '25' que vira '2' '5'
  // 5 vira '5' que vira '05' devido ao padstart e vira '0' '5'
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  // Inciando countdown
  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    // Usamos o clearTimeout para evitar o bug de um segundo, que se nao usarmos quando pararmos o countdown ele ainda contará + 1 segundo
    clearTimeout(countdownTimeout);

    // Parando countdown
    setIsActive(false);

    //Voltamos o countdown para 25 minutos
    setTime(0.1 * 60);
  }

  // diminui um do countdown todo vez que o isActive e o time mudar, entao enquanto o isActive for true e time irá mudar
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

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

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
          <Check/>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <Close />
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
                  Iniciar um ciclo
                  <Play/>
            </button>
          )}{' '}
        </>
      )}
    </div>
  );
};

export default Countdown;
