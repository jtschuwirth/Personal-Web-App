import type { NextPage } from 'next'
import { useState, useEffect, useRef } from "react";
import styles from '../../styles/Host.module.css'
import { PromptDisplay } from '../../components/PromptDisplayPeopleSort';
import { Foot } from "../../components/Foot"
import { Title } from '../../components/TitleContainer';
import { PlayerDisplay } from "../../components/PlayerDisplay"
import { useSocket } from "../../hooks/useSocket"
import { PlayerStack } from "../../components/PlayerStack"

interface Players {
  id: string;
  user_name:string;
  points:number;
  last_turn_points:number;
  turn_status:string;
}

interface RoundEndPlayers {
  connection_id:string;
  user_name:string;
  points:number;
  last_turn_points:number;
  answer:string;
  guess:string;
}

interface Last_Round_Order {
  user_name:string;
  distance:number;
}

const Host: NextPage = () => {
  const [prompt, setPrompt] = useState({max:"",min:""});
  const [players, setPlayers] = useState<Players[]>([])
  const [last_prompt, setLastPrompt] = useState({max:"",min:""});
  const [room, setRoom] = useState<string|null>(null);
  const [started, setStarted] = useState(0);
  const [last_round_order, setLastRoundOrder] = useState<Last_Round_Order[]>([])
  const runs = useRef(0)

  const socket = useSocket(room?`wss://cwap247wcg.execute-api.us-east-1.amazonaws.com/production?name=host&host=1&room=${room}`:null)

  const normalCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function generateRoom(length:number) {
    var characterList = normalCharacters;
    var result = "";
    while (length > 0) {
      // Pick random index from characterList
      var index = Math.floor(Math.random() * characterList.length);
      result += characterList[index];
      length--;
    }
    return result;
  }
  
  useEffect(() => {
    if (!runs.current) {
      let new_room = generateRoom(4)
      setRoom(new_room)
      runs.current=1
    }

    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.new_connection) {
          data.new_connection.turn_status = "playing"
          setPlayers((players) => [...players, data.new_connection])

        } else if ((data.disconnected)) {
          setPlayers((players) => players.filter((_) => _.id!==data.disconnected))

        } else if (data.turn_end) {
          data.turn_end.turn_status = "done"
          setPlayers((players) => {
            data.turn_end.last_turn_points=players.find(element => element.id===data.turn_end.id)?.last_turn_points
            return players.filter((_) => _.id!==data.turn_end.id)
          })
          setPlayers((players) => [...players, data.turn_end])

        } else if (data.round_end) {
          setPlayers([])
          setLastRoundOrder([])
          setLastPrompt(prompt)
          setPrompt(data.new_prompt)
          data.round_end.map((_:RoundEndPlayers) => setPlayers((players) => [...players, {
            id:_.connection_id, 
            user_name:_.user_name, 
            points:_.points, 
            last_turn_points:_.last_turn_points, 
            turn_status: "playing"
          }]))
          //Agregar un sort para que aparescan segun distancia
          data.correct_order.map((_:Last_Round_Order) => setLastRoundOrder((players) => [...players, {
            user_name:_.user_name,
            distance: _.distance
          }]))

        } else if (data.starting_game) {
          setPrompt(data.starting_game)
        }
      };
  
      window.onbeforeunload = function() {
        socket.onclose = function () {}; // disable onclose handler first
        socket.close();
      };
      
    }
  }, [runs, socket, prompt]);

  function handleStartGame() {
    if (socket && socket.readyState===1) {
      socket.send(JSON.stringify({action: "startgame"}))
      setStarted(1)
    }
  }

  if (!started) {
    return (
      <div className={styles.main}>
        <Title title="People Sort Party Mode" socket={socket}/>
        <div className={styles.start_game}>
        <span className={styles.room}>Room Id: {room}</span>
        <button className={styles.btn_start} onClick={() => handleStartGame()}>Start Game</button>
        <PlayerDisplay players={players}/>
        </div>
        <Foot />
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.main_title}>
      <Title title="People Sort Party Mode" socket={socket}/>
      <span className={styles.room}>Room Id: {room}</span>
      <div className={styles.main_content}>
        <div className={styles.side_section}>
        <div className={styles.standings}>
          <span className={styles.title}>Correct Order</span>
          <PlayerStack players={last_round_order} setPlayers={setLastRoundOrder} prompt={last_prompt}/>
          </div>
        </div>

        <div className={styles.middle_section}>
          <PromptDisplay prompt={prompt} />
        </div>
        
        <div className={styles.side_section}>
        <div className={styles.standings}>
          <span className={styles.title}>Standings</span>
          <PlayerDisplay players={players}/>
         </div>
        </div>
        </div>
        </div>
      <Foot />
      
    </div>

  )
}

export default Host