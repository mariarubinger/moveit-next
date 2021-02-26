//tudo que vai repetir em várias páginas vai ser importado aqui
import '../styles/global.css';

function MyApp({ Component, pageProps }) {

  return (
    <Component {...pageProps} />
  )
}

export default MyApp

/* Component {...pageProps} quando um componente recebe conteúdo dentro dele isso chama children (propriedade) */

/* pode enviar um objeto dentro do value ou uma função */

/* o app vai incorporar todo o código que tem aqui */