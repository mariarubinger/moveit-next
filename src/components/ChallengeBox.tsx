import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, completeChallenge, resetChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  /* essa função foi criar pro código ficar mais simples. é uma função que chama duas outras funções */
  function handleChallengeSucceeded() {
    completeChallenge(); /* função que vem de dentro do contexto ChallengesContext */
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSuccededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
          </div>
        )}
    </div>
  )
}

/* condicional
  { hasActiveChalenge ? (
    se tem desafio ativo vai aparecer essa div
    <div>
    </div>

  ) : (
    se não tem desafio ativo vai aparecer essa div
    <div>
    </div>
  ) }

*/