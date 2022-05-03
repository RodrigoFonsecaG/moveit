import React, { ReactNode, useState } from 'react';
import challenges from '../../challenges.json'

interface Challenge{
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
  experienceToNextLevel: number;
}



//typescript
interface ChallengesProviderProps {
  children: ReactNode; // aceita como filho texto, html, componente etc
}

export const ChallengesContext = React.createContext({} as ChallengesContextData);

export const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
  // level
  const [level, setLevel] = useState(1);

  // experiencia
  const [currentExperience, setCurrentExperience] = useState(0);

  //desafios completados
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  // calculo para o proximo nivel
  const experienceToNextLevel = Math.pow((level + 1) * 4 , 2)

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)

    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null);
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
        resetChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};

export default ChallengesContext;
