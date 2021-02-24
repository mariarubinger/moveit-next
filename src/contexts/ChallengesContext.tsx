import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

/* vai definir o tipo que tenho dentro do meu objeto  */
interface Challenge {
  type: 'body' | 'eye'; /* body ou eye */
  description: string;
  amount: number;
}

/* tipagem dos dados que eu vou retornar dentro do meu contexto */
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void; /* função que não tem nenhum retorno e não recebe nenhum parâmetro */
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

/* tipagem do children */
interface ChallengesProviderProps {
  children: ReactNode;
}

/* Criação do Contexto */
export const ChallengesContext = createContext({} as ChallengesContextData); /* ele segue o formato da interface de cima */


export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0); /* experência do usuário que começara em 0 xp */
  const [challengesCompleted, setChallengesCompleted] = useState(0); /* número de desafios concluídos */

  /* estado pra armazenar o challenge */
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2) /* cáclulo que os rpgs usam para cálculo de level - nesse caso usei potência */

  function levelUp() {
    setLevel(level + 1);
  }

  /* quando finalizar o ciclo e chegar no zero, quero disparar um novo desafio quando  */
  function startNewChallenge() {
    //console.log('New challenge')
    const randonChallengeIndex = Math.floor(Math.random() * challenges.length) /* retorna um número aleatório */
    const challenge = challenges[randonChallengeIndex];

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
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
