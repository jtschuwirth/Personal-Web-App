import type { NextPage } from 'next'
import { useState } from "react";
import styles from '../styles/Nunca.module.css'
import { Game } from '../components/Game'
import { LevelSelector } from "../components/LevelSelector"
import { Foot } from "../components/Foot"

const NuncaNunca: NextPage = () => {
  const [level, setLevel] = useState(1);
  return (
    <div className={styles.main}>
      <div className={styles.main_content}>
        <span className={styles.page_title}>Never have i ever</span>
        <LevelSelector level={level} setLevel={setLevel} game="nuncanunca"/>
        <Game 
          level={level} 
          game="nuncanunca"
        />
        </div>
      <Foot game="nuncanunca"/>
    </div>

  )
}

export default NuncaNunca
