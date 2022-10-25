import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link  from 'next/link'
import { Foot } from "../components/Foot"

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.main_content}>
      <Link href="/online" >
        <div className={styles.game_container}>
          <span className={styles.game_title}>Never have i ever Party Mode!</span>
        </div>
      </Link>
      <Link href="/wnrs" >
        <div className={styles.game_container}>
          <span className={styles.game_title}>We are not really strangers</span>

        </div>
      </Link>
      <Link href="/nhie" >
        <div className={styles.game_container}>
          <span className={styles.game_title}>Never have i ever</span>
        </div>
      </Link>
      </div>
      <Foot />
    </div>
  )
}

export default Home
