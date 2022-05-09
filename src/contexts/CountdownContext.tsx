import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import ChallengesContext from './ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode; // aceita como filho texto, html, componente etc
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  // 25 min em segundos
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

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

    // voltando o botao de iniciar ciclo
    setHasFinished(false)
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
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
