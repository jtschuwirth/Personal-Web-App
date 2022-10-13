import styles from "./style.module.css"
import { useState, useEffect } from "react";
import axios from "axios"

interface Props {
  level: number
}

export const Game  = ({level}:Props) => {
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function warmBackend() {
      await axios.get(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/icebreakers/phrases?level=1`)
    }
    warmBackend()
  }, []);

  async function handleClick() {
    if (loading) return;
    setLoading(true)
    let response = await axios.get(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/icebreakers/phrases?level=${level}`)
    setPhrase(response.data[0].phrase)
    setLoading(false)

  }
  return (
    <div className={styles.gameContainer}>
      <div className={styles.phraseContainer}>
        <span className={styles.phrase}>{phrase}</span>
      </div>
      <button className={styles.btn} onClick={() => handleClick()}>{loading?"Loading":"Get new prompt"}</button>
    </div>

  );
};
