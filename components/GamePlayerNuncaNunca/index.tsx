import styles from "./style.module.css"
import { useState, useEffect } from "react";
import { Counter } from "../Counter"
import { Opinion } from "../Opinion"
import { LastPrompt } from '../LastPromptNuncaNunca';
import { PromptDisplay } from '../PromptDisplayNuncaNunca'

interface Props {
    socket:WebSocket|undefined;
}

interface Players {
    id: string;
    user_name:string;
    points:number;
    last_turn_points:number;
    turn_status:string;
  }
  
  interface RoundEndData {
    connection_id:string;
    user_name:string;
    points:number;
    last_turn_points:number;
    answer:string;
    guess:string;
  }

export const Game = ({socket}:Props) => {
    const [answer, setAsnwer] = useState<number|null>(null)
    const [guess, setGuess] = useState(0)
    const [turn, setTurn] = useState(1)
    const [prompt, setPrompt] = useState("")
    const [level, setLevel] = useState(0)
    const [opinion, setOpinion] = useState(1)
    const [players, setPlayers] = useState<Players[]>([])
    const [last_prompt, setLastPrompt] = useState("");
    const [doneIt, setDoneIt] = useState(0)
    const [notDoneIt, setNotDoneIt] = useState(0)
    const [show_last_turn, setShowLastTurn] = useState(0)

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.round_end) {
                    setPlayers([])
                    setDoneIt(0)
                    setNotDoneIt(0)
                    setTurn(0)
                    setAsnwer(null)
                    setGuess(0)
                    setLastPrompt(prompt)
                    setPrompt(data.new_prompt.phrase)
                    setLevel(data.new_prompt.lvl)
                    setOpinion(0)
                    data.round_end.map((_:RoundEndData) => setPlayers((players) => [...players, {
                        id:_.connection_id, 
                        user_name:_.user_name, 
                        points:_.points, 
                        last_turn_points:_.last_turn_points, 
                        turn_status: "playing"
                      }]))
                    data.round_end.map((_:RoundEndData) => {
                        if (parseInt(_.answer)===1) { setDoneIt((answer) => answer+1)} 
                        else { setNotDoneIt((answer) => answer+1) }
                    })
                } else if (data.starting_game) {
                    setTurn(0)
                    setPrompt(data.starting_game.phrase)
                    setLevel(data.starting_game.lvl)
                    setOpinion(0)
                }
            };
        }
      }, [socket, prompt]);

    function handleClick() {
        if (socket && socket.readyState===1 && answer!==null) {
            setTurn(1)
            socket.send(JSON.stringify({action: "endturn", guess:guess, answer:answer}))
        }
    }

    function handleShow() {
        if (show_last_turn){
            setShowLastTurn(0)
        } else {
            setShowLastTurn(1)
        }
    }
    


    return (
        <div className={styles.game_container}>
            <PromptDisplay prompt={prompt} location={"mobile"}/>
            {!turn?<>
            <div className={styles.choice}>
                <div className={answer===1?styles.btn_active:styles.btn} onClick={() => setAsnwer(1)}>I have </div>
                <div className={answer===0?styles.btn_active:styles.btn} onClick={() => setAsnwer(0)}>i have never</div>
            </div>
            <span className={styles.desc}>How many players do you think have done it?</span>
            <Counter count={guess} setCount={setGuess} max={players.length||100}/>
            </>:
            <>
            {!opinion?<Opinion phrase={prompt} level={level} setOpinion={setOpinion}/>:null}
            <div className={styles.choice}>
                <span>Waiting Other Players</span>
            </div>
            </>}
            {!turn?<div className={styles.btn_turn} onClick={() => handleClick()}>End Turn</div>:null}
            {show_last_turn?<div className={styles.btn_turn} onClick={() => handleShow()}>show last turn data</div>:null}
            {show_last_turn?<LastPrompt doneIt={doneIt} notDoneIt={notDoneIt} last_prompt={last_prompt}/>:null}
        </div>

    );
  };