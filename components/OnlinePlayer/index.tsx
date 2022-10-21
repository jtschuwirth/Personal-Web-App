import styles from "./style.module.css"
import { useState, useEffect } from "react";
import { Counter } from "../Counter"

interface Props {
    socket:WebSocket|undefined;
}

export const Game = ({socket}:Props) => {
    const [answer, setAsnwer] = useState<number|null>(null)
    const [guess, setGuess] = useState(0)
    const [turn, setTurn] = useState(0)

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data?.round_end) {
                  setTurn(0)
                  setAsnwer(null)
                  setGuess(0)
                } 
            };
        }
      }, [socket]);

    function handleClick() {
        if (socket && socket.readyState===1 && answer!==null) {
            setTurn(1)
            socket.send(JSON.stringify({action: "endturn", guess:guess, answer:answer}))
        }
    }


    


    return (
        <div className={styles.game_container}>
            {!turn?<>
            <div className={styles.choice}>
                <button className={answer===1?styles.btn_active:styles.btn} onClick={() => setAsnwer(1)}>I have </button>
                <button className={answer===0?styles.btn_active:styles.btn} onClick={() => setAsnwer(0)}>i have never</button>
            </div>
            <span className={styles.desc}>How many players do you think have done it?</span>
            <Counter count={guess} setCount={setGuess}/>
            </>:
            <div className={styles.choice}>
                <span>Waiting Other Players</span>
            </div>}
            <button className={turn?styles.btn_active:styles.btn} onClick={() => handleClick()}>End Turn</button>
        </div>

    );
  };