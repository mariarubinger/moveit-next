import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
  closeLevelUpModal: () => void;
}

/* tipagem do children */
interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;

}

/* Criação do Contexto */
export const ChallengesContext = createContext({} as ChallengesContextData); /* ele segue o formato da interface de cima */

/* ...rest é uma variável que recebe as outras propriedades */
/* o rest é um objeto que tem todas as outras prpriedades além da children que no caso são o level, currenteExperience, challengesCompleted */
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1); /* se não existir o valor, será 1 */
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0); /* experência do usuário que começara em 0 xp */
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0); /* número de desafios concluídos */

  /* estado pra armazenar o challenge */
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2) /* cáclulo que os rpgs usam para cálculo de level - nesse caso usei potência */


  /* Notificação */
  /* sempre que você ver um useEffect que o segundo parametro dele vazio quer dizer a primeira função dele sera executada apenas uma unica vez */
  useEffect(() => {
    Notification.requestPermission(); /* API do proprio browser */
  }, [])

  /* temos um array de dependências */
  /* eu vou disparar uma função sempre que uma ou outras informações mudarem */
  /* essas informações serão salvas nos Cookies */
  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true)
  }

  /* função pra fechar o Modal que abre quando mudo de level */
  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
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
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {/* se IsLevelUpModalOpen for true vai aparecer o LevelUpModal */}
      { isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContext.Provider>
  );
}
