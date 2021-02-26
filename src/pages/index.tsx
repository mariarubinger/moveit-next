import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

/* criamos essa interface pq ao passar o mouse em props estava como any */
interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props) {
  console.log(props)

  return (
    /* passar as informações */
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >

      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

/* para recuperar os dados que foram salvos pelo Cookies */
/* eu consigo manipular os dados que são rodados no Node e que vai passar pro usuário no frontend */
/* antes da interface estar visivel em tela o Node vai fazer a chamada na API e vai passar pro componente  */

/* tudo que vem aqui vai aparecer no terminal do Node,
por exemplo, se colocar um console.log vai aparecer aqui e não no browser
 */

// o tipo da função é GetServerSideProps pra ele já entender o parametro ctx (context)
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level), // converrter de string para número
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

// ctx.req.cookies === dentro do contexto eu faço uma requisição de todos os meus cookies


// Back-end 
// Next.js (Node.js)
// Front-end (React)

/* Quando estou na camada do Node estou no backend


*/
