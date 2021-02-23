import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const [time, setTime] = useState(25 * 60); /* multiplica por 60 pra representar em segundos */
  const [active, setActive] = useState(false); /* no começo não vai estar ativo, o usuário precisa clicar no botão pra iniciar  */

  const minutes = Math.floor(time / 60); /* vai arredonar pro número inteiro pra baixo */
  const seconds = time % 60; /* vai retornar o que sobrou da divisão */

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); /* vai verificar se a string tem 2 caracteres e vai divir, exemplo 25 ficara '2' '5' mas caso não tenha ele vai adicionar o '0' na frente */
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setActive(true);
  }

  useEffect(() => {
    //console.log(active)
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000) /* setTimeout quero que algo aconteça após 1000 (1 segundo) eu vou reduzir um segundo do time */
    }
  }, [active, time])

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

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}
