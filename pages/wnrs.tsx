import type { NextPage } from 'next'
import { useState } from "react";
import styles from '../styles/WNRS.module.css'
import { Game } from '../components/Game'
import { LevelSelector } from "../components/LevelSelector"
import { Foot } from "../components/Foot"
import { Title } from '../components/TitleContainer';


const WNRS: NextPage = () => {
  const [level, setLevel] = useState(1);

  return (
    <div className={styles.main}>
      <div className={styles.main_content}>
        <Title title="We're not really strangers" />
        <LevelSelector level={level} setLevel={setLevel} game="icebreakers"/>
        <Game 
          level={level} 
          game="icebreakers"
          />
        </div>
      <Foot />
    </div>

  )
}

export default WNRS
