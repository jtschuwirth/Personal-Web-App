import type { NextPage } from 'next'
import { useState } from "react";
import styles from '../styles/Nunca.module.css'
import { Game } from '../components/GameStandard'
import { LevelSelector } from "../components/LevelSelector"
import { Foot } from "../components/Foot"
import { Title } from '../components/TitleContainer';

const NuncaNunca: NextPage = () => {
  const [level, setLevel] = useState(1);

  return (
    <div className={styles.main}>
      <div className={styles.main_content}>
        <Title title="Never have i ever" />
        <LevelSelector level={level} setLevel={setLevel} game="nuncanunca"/>
        <Game 
          level={level} 
          game="nuncanunca"
        />
        </div>
      <Foot />
    </div>

  )
}

export default NuncaNunca
