import styles from "./style.module.css"
import { useState, useEffect } from "react";
import { PlayerStack } from "../PlayerStack"

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
  }

  interface StartGameData {
    connection_id:string;
    user_name:string;
    points:number;
  }

export const Game = ({socket}:Props) => {
    const [turn, setTurn] = useState(1)
    const [prompt, setPrompt] = useState({max:"",min:""})
    const [players, setPlayers] = useState<Players[]>([])
    const [last_prompt, setLastPrompt] = useState({max:"",min:""});

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.round_end) {
                    setPlayers([])
                    setTurn(0)
                    setLastPrompt(prompt)
                    setPrompt(data.new_prompt)
                    data.round_end.map((_:RoundEndData) => setPlayers((players) => [...players, {
                        id:_.connection_id, 
                        user_name:_.user_name, 
                        points:_.points, 
                        last_turn_points:_.last_turn_points, 
                        turn_status: "playing"
                      }]))
                      
                } else if (data.starting_game) {
                    setTurn(0)
                    setPlayers([])
                    setPrompt(data.starting_game)
                    data.players.map((_:StartGameData) => setPlayers((players) => [...players, {
                        id:_.connection_id, 
                        user_name:_.user_name, 
                        points:_.points, 
                        last_turn_points:0,
                        turn_status: "playing"
                      }]))
                }
            };
        }
      }, [socket, prompt]);

    function handleClick() {
        if (socket && socket.readyState===1 && players!==null) {
            setTurn(1)
            socket.send(JSON.stringify({action: "endturn", answer: players}))
        }
    }

    return (
        <div className={styles.game_container}>
            {!turn?
            <div className={styles.game}>
                <PlayerStack players={players} setPlayers={setPlayers} prompt={prompt}/>
            </div>:
            <div className={styles.text}>Waiting Other Players</div>}
            {!turn?<div className={styles.btn_turn} onClick={() => handleClick()}>End Turn</div>:null}
        </div>

    );
  };