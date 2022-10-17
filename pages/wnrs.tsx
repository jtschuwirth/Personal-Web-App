import type { NextPage } from 'next'
import { useState } from "react";
import styles from '../styles/WNRS.module.css'
import { Game } from '../components/Game'
import { LevelSelector } from "../components/LevelSelector"
import { Foot } from "../components/Foot"

const WNRS: NextPage = () => {
  const [level, setLevel] = useState(1);
  return (
    <div className={styles.main}>
      <div className={styles.main_content}>
        <span className={styles.page_title}>We are not really strangers</span>
        <LevelSelector level={level} setLevel={setLevel} game="icebreakers"/>
        <Game 
          level={level} 
          game="icebreakers"
          />
        </div>
      <Foot game="icebreakers"/>
    </div>

  )
}

export default WNRS
