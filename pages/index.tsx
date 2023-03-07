import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link  from 'next/link'
import { Foot } from "../components/Foot"
import { Selector } from '../components/IndexViewSelector'
import { useState } from "react"


const Home: NextPage = () => {
  const [view, setView] =useState(1)

  if (view) {
    return (
    <div className={styles.main}>
      <div className={styles.main_content}>
        <Selector view={view} setView={setView} />
        <Link href="/nuncanuncaparty" >
          <div className={styles.game_container}>
            <span className={styles.game_title}>Never have i ever Party</span>
          </div>
        </Link>
        <Link href="/peoplesortparty" >
          <div className={styles.game_container}>
            <span className={styles.game_title}>People sort Party</span>
          </div>
        </Link>
      </div>
      <Foot />
    </div>
    )
  }

  return (
      <div className={styles.main}>
        <div className={styles.main_content}>
        <Selector view={view} setView={setView} />
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
