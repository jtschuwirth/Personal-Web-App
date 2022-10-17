import styles from "./style.module.css"
import { useState, useEffect } from "react";
import axios from "axios"
import {BiLike, BiDislike} from "react-icons/bi"

interface Props {
  level:number;
  game:string;
}

interface Phrase {
  phrase:string;
  lvl:string;
}

export const Game  = ({level, game}:Props) => {
  const [buffer, setBuffer] = useState<Phrase[]>([])
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false)
  const [opinion, setOpinion] = useState("none")
  const [phraseLevel, setPhraseLevel] = useState(1)

  useEffect(() => {
    async function warmBackend() {
      await axios.get(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/${game}/phrases?level=1`)
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

      axios.post(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/${game}/opinion`, data, config
      ).then( function() {
        //console.log(data)

      }).catch( function(error) {
        console.log(error)
      })
    }

    if (buffer.length===0 || phraseLevel !== level) {
      let response = await axios.get(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/${game}/phrases?n=31&level=${level}`)
      setPhrase(response.data[0].phrase)
      setPhraseLevel(parseInt(response.data[0].lvl))
      response.data.shift()
      setBuffer(response.data)
    } else {
      setPhrase(buffer[0].phrase)
      setPhraseLevel(parseInt(buffer[0].lvl))
      let new_buffer = [...buffer]
      new_buffer.shift()
      setBuffer(new_buffer)
    }

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
    <div className={styles.game_container}>
      <div className={styles.opinion_container}>
        <div 
          className={opinion==="dislike"?styles[`like_container_active_${game}`]:styles[`like_container_${game}`]}
          onClick={() => handleDislike()}
          ><BiDislike size={20}/></div>
        <div 
          className={opinion==="like"?styles[`like_container_active_${game}`]:styles[`like_container_${game}`]}
          onClick={() => handleLike()}
          ><BiLike size={20}/></div>
      </div>
      <div className={styles.phrase_container}>
        <span className={styles.phrase}>{phrase}</span>
      </div>
      <button className={styles[`btn_${game}`]} onClick={() => handleClick()}>{loading?"Loading":"Get new prompt"}</button>
    </div>

  );
};
