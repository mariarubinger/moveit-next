import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void; /* função que não recebe parâmetro e o retorno é vazio */
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;


export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60); /* multiplica por 60 pra representar em segundos */
  const [isActive, setIsActive] = useState(false); /* no começo não vai estar ativo, o usuário precisa clicar no botão pra iniciar  */
  const [hasFinished, setHasFinished] = useState(false); /* finalizou - quando o contador chega em 00:00 */

  const minutes = Math.floor(time / 60); /* vai arredonar pro número inteiro pra baixo */
  const seconds = time % 60; /* vai retornar o que sobrou da divisão */

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false); /* o IsActive vai parar */
    setHasFinished(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    //console.log(active)
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000) /* setTimeout quero que algo aconteça após 1000 (1 segundo) eu vou reduzir um segundo do time */
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge(); /* quando o timer chegar em 0, ele vai começar um novo desafio */
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}