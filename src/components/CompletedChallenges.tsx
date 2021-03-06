import React, { useContext } from 'react';
import ChallengesContext from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';



const CompletedChallenges = () => {


  const { challengesCompleted } = useContext(ChallengesContext);
  

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{Number(challengesCompleted)}</span>
    </div>
  );
};

export default CompletedChallenges;
