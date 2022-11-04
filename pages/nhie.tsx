import type { NextPage } from 'next'
import { useState } from "react";
import styles from '../styles/Nunca.module.css'
import { Game } from '../components/GameStandard'
import { LevelSelector } from "../components/LevelSelector"
import { Foot } from "../components/Foot"
import { Title } from '../components/TitleContainer';
import { LikeDislikeComponent } from '../components/LikeDislikeComponent';

const NuncaNunca: NextPage = () => {
  const [level, setLevel] = useState(1);
  const [opinion, setOpinion] = useState("")

  return (
    <div className={styles.main}>
      <div className={styles.main_content}>
        <Title title="Never have i ever" />
        <LevelSelector level={level} setLevel={setLevel} game="nuncanunca"/>
        <div className={styles.game_container}>
          <LikeDislikeComponent handle_like={() => setOpinion("like")} handle_dislike={() => setOpinion("dislike")}/>
          <Game 
            level={level} 
            game="nuncanunca"
            opinion={opinion}
            setOpinion={setOpinion}
            />
        </div>
        </div>
      <Foot />
    </div>

  )
}

export default NuncaNunca
