import styles from "./style.module.css"
import { useState } from "react";
import axios from "axios"

interface Props {
  level: number
}

export const Game  = ({level}:Props) => {
  const [phrase, setPhrase] = useState("_______________________");
  async function handleClick() {
    let response = await axios.get(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/icebreakers/phrases?level=${level}`)
    setPhrase(response.data[0].phrase)
    console.log(response)

  }
  return (
    <div className={styles.gameContainer}>
      <span>{phrase}</span>
      <button className={styles.btn} onClick={() => handleClick()}>Get new prompt</button>
    </div>

  );
};
