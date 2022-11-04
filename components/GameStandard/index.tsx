import styles from "./style.module.css"
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios"

interface Props {
  level:number;
  game:string;
  opinion:string;
  setOpinion:Dispatch<SetStateAction<string>>;
}

interface Phrase {
  phrase:string;
  lvl:string;
}

export const Game  = ({level, game, opinion, setOpinion}:Props) => {
  const [buffer, setBuffer] = useState<Phrase[]>([])
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false)
  const [phraseLevel, setPhraseLevel] = useState(1)

  useEffect(() => {
    async function warmBackend() {
      await axios.get(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/${game}/phrases?level=1`)
    }
    warmBackend()
  }, [game]);

  async function handleClick() {
    if (loading) return;
    setLoading(true)

    if (opinion && phrase) {
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

    setOpinion("")
    setLoading(false)

  }
  
  return (
    <>
      <div className={styles.phrase_container}>
        <span className={styles.phrase}>{phrase}</span>
      </div>
      <button className={styles[`btn_${game}`]} onClick={() => handleClick()}>{loading?"Loading":"Get new prompt"}</button>
    </>

  );
};
