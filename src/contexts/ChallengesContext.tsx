import React, { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import LevelUpModal from '../components/levelUpModal';

interface Challenge {
  type: 'body' | 'eye'; // type só pode ser um dos dois
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  experienceToNextLevel: number;
}

//typescript
interface ChallengesProviderProps {
  children: ReactNode; // aceita como filho texto, html, componente etc
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = React.createContext(
  {} as ChallengesContextData
);

export const ChallengesProvider = ({
  children,
  ...rest
}: ChallengesProviderProps) => {

  // level
  const [level, setLevel] = useState(rest.level ?? 1);

  // experiencia
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);

  //desafios completados
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  // calculo para o proximo nivel
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    // Salvando level, experience e challengesCompleted
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);

    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio!!', {
        body: `Valendo ${challenge.amount}xp!`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    // Xp do desafio ativo
    const { amount } = activeChallenge;

    // Experiencia do usuario + experiencia do desafio
    let finalExperience = currentExperience + amount;

    // Se a xp do usuario for maior que o necessario pra subir de nivel, vamos subir ele de nivel e zerar a xp, pegando apenas o resto
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      {isLevelUpModalOpen ? <LevelUpModal /> : null}
    </ChallengesContext.Provider>
  );
};

export default ChallengesContext;
