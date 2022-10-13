import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Game } from '../components/Game'
import { LevelSelector } from "../components/LevelSelector"
import { useState } from "react";

const Home: NextPage = () => {
  const [level, setLevel] = useState(1);
  return (
    <div className={styles.main}>
      <span className={styles.page_title}>We are not really strangers</span>
      <LevelSelector level={level} setLevel={setLevel} />
      <Game level={level}/>
    </div>

  )
}

export default Home
