import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(0.1 * 60); /* multiplica por 60 pra representar em segundos */
  const [isActive, setIsActive] = useState(false); /* no começo não vai estar ativo, o usuário precisa clicar no botão pra iniciar  */
  const [hasFinished, setHasFinished] = useState(false); /* finalizou - quando o contador chega em 00:00 */

  const minutes = Math.floor(time / 60); /* vai arredonar pro número inteiro pra baixo */
  const seconds = time % 60; /* vai retornar o que sobrou da divisão */

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); /* vai verificar se a string tem 2 caracteres e vai divir, exemplo 25 ficara '2' '5' mas caso não tenha ele vai adicionar o '0' na frente */
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false); /* o IsActive vai parar */
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
    }
  }, [isActive, time])

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
