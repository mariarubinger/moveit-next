//tudo que vai repetir em várias páginas vai ser importado aqui
import '../styles/global.css';

import { ChallengesProvider } from '../contexts/ChallengesContext'
import { useState } from 'react';


function MyApp({ Component, pageProps }) {

  return (
    <ChallengesProvider>
      <Component {...pageProps} /> {/* quando um componente recebe conteúdo dentro dele isso chama children (propriedade) */}
    </ChallengesProvider>
  )
}

export default MyApp

/* pode enviar um objeto dentro do value ou uma função */