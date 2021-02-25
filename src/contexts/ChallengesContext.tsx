import { createContext, ReactNode, useEffect, useState } from 'react';
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
  completeChallenge: () => void;
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


  /* Notificação */
  /* sempre que você ver um useEffect que o segundo parametro dele vazio quer dizer a primeira função dele sera executada apenas uma unica vez */
  useEffect(() => {
    Notification.requestPermission(); /* API do proprio browser */
  }, [])

  function levelUp() {
    setLevel(level + 1);
  }

  /* quando finalizar o ciclo e chegar no zero, quero disparar um novo desafio quando  */
  function startNewChallenge() {
    //console.log('New challenge')
    const randonChallengeIndex = Math.floor(Math.random() * challenges.length) /* retorna um número aleatório */
    const challenge = challenges[randonChallengeIndex];

    setActiveChallenge(challenge)

    /* Tocando áudio no desafio */
    new Audio('/notification.mp3').play();

    /* se o usuário permitiu as notificações, então: */
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  /* função para o Botão Completei */
  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    /* usamos let pq ela pode receber um novo valor no futuro */
    let finalExperience = currentExperience + amount;

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
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
