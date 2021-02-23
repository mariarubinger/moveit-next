//tudo que vai repetir em várias páginas vai ser importado aqui
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
