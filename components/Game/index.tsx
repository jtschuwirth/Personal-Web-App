import styles from "./style.module.css"
import { useState, useEffect } from "react";
import axios from "axios"
import {GrLike, GrDislike} from "react-icons/gr"

interface Props {
  level: number
}

export const Game  = ({level}:Props) => {
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false)
  const [opinion, setOpinion] = useState("none")
  const [phraseLevel, setPhraseLevel] = useState(1)

  useEffect(() => {
    async function warmBackend() {
      await axios.get(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/icebreakers/phrases?level=1`)
    }
    warmBackend()
  }, []);

  async function handleClick() {
    if (loading) return;
    setLoading(true)

    if (opinion!=="none" && phrase!=="") {
      let opinion_response
      if (opinion === "like") {
        opinion_response = 1
      } else {
        opinion_response = 0
      }

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
      const data = {
        phrase:phrase,
        opinion: opinion_response,
        level:phraseLevel
      }

      axios.post(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/icebreakers/opinion`, data, config
      ).catch( function(error) {
        console.log(error)
      })
    }
    let response = await axios.get(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/icebreakers/phrases?level=${level}`)
    setPhrase(response.data[0].phrase)
    setPhraseLevel(level)
    setOpinion("none")
    setLoading(false)

  }

  async function handleDislike() {
    if (opinion!=="dislike") {
      setOpinion("dislike")
    } else {
      setOpinion("none")
    }
  }

  async function handleLike() {
    if (opinion!=="like") {
      setOpinion("like")
    } else {
      setOpinion("none")
    }
  }

  return (
    <div className={styles.gameContainer}>
      <div className={styles.opinion_container}>
        <div 
          className={opinion==="dislike"?styles.like_container_active:styles.like_container}
          onClick={() => handleDislike()}
          ><GrDislike /></div>
        <div 
          className={opinion==="like"?styles.like_container_active:styles.like_container}
          onClick={() => handleLike()}
          ><GrLike /> </div>
      </div>
      <div className={styles.phraseContainer}>
        <span className={styles.phrase}>{phrase}</span>
      </div>
      <button className={styles.btn} onClick={() => handleClick()}>{loading?"Loading":"Get new prompt"}</button>
    </div>

  );
};
