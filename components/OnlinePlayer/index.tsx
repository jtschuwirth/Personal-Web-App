import styles from "./style.module.css"
import { useState, useEffect } from "react";
import { Counter } from "../Counter"
import { count } from "console";

interface Props {
    socket:WebSocket|undefined;
}

export const Game = ({socket}:Props) => {
    const [answer, setAsnwer] = useState(0)
    const [guess, setGuess] = useState(0)
    const [turn, setTurn] = useState(0)

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data?.round_end) {
                  setTurn(0)
                } 
            };
        }
      }, [socket]);

    function handleClick() {
        socket?.send(JSON.stringify({action: "endturn", guess:guess, answer:answer}))
        setTurn(1)
    }


    


    return (
        <div className={styles.game_container}>
            {!turn?
            <div className={styles.choice}>
                <button className={answer?styles.btn_active:styles.btn} onClick={() => setAsnwer(1)}>Done it</button>
                <button className={!answer?styles.btn_active:styles.btn} onClick={() => setAsnwer(0)}>Never done it</button>
            </div>:
            <div className={styles.choice}>
                <span>Waiting Other Players</span>
            </div>}


            <span className={styles.desc}>How many players do you think have done it?</span>
            <Counter count={guess} setCount={setGuess}/>
            <button className={turn?styles.btn_active:styles.btn} onClick={() => handleClick()}>End Turn</button>
        </div>

    );
  };