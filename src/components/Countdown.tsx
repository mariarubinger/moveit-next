import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {

  /* isso faz parte de como minha aplicação é visualizada (layout) */
  /* esse componenye funciona pra mostrar em tela e é excluisvo desse componente */
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); /* vai verificar se a string tem 2 caracteres e vai divir, exemplo 25 ficara '2' '5' mas caso não tenha ele vai adicionar o '0' na frente */
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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

      {/* se isActive é true vai aparecer Abandonar ciclo senão Iniciar um ciclo }
      { isActive ? 'Abandonar ciclo' : 'Iniciar um ciclo' */}

      {/* só tem o if then */}
      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
          <>
            { isActive ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`} /* concatenar dois estilos */
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
            ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar um ciclo
                </button>
              )}
          </>
        )}
    </div>
  );
}
