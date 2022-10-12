import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Game } from '../components/Game'

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <Game />
    </div>

  )
}

export default Home
