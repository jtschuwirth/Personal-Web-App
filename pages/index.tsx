import type { NextPage } from 'next'
import { useState } from "react";
import styles from '../styles/Home.module.css'
import { Game } from '../components/Game'
import { LevelSelector } from "../components/LevelSelector"
import { Foot } from "../components/Foot"

const Home: NextPage = () => {
  const [level, setLevel] = useState(1);
  return (
    <div className={styles.main}>
      <span className={styles.page_title}>We are not really strangers</span>
      <LevelSelector level={level} setLevel={setLevel} />
      <Game level={level}/>
      <Foot />
    </div>

  )
}

export default Home
