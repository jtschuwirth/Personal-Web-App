import type { NextPage } from 'next'
import { useState, useEffect, useRef } from "react";
import styles from '../../styles/Host.module.css'
import { Game } from '../../components/OnlineGame'
import { LevelSelector } from "../../components/LevelSelector"
import { Foot } from "../../components/Foot"
import { Title } from '../../components/TitleContainer';
import { PlayerDisplay } from "../../components/PlayerDisplay"
import { LastPrompt } from "../../components/LastPrompt"


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

const Host: NextPage = () => {
  const [prompt, setPrompt] = useState("");
  const [players, setPlayers] = useState<Players[]>([])
  const [doneIt, setDoneIt] = useState(0)
  const [notDoneIt, setNotDoneIt] = useState(0)
  const [socket, setSocket] = useState<WebSocket>()
  const [last_prompt, setLastPrompt] = useState("");
  const [room, setRoom] = useState("");
  const [started, setStarted] = useState(0);
  const runs = useRef(0)

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
      const newSocket = new WebSocket(`wss://2mgs44ly30.execute-api.us-east-1.amazonaws.com/production?name=host&host=1&room=${new_room}`)
      setSocket(newSocket)
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
          setDoneIt(0)
          setNotDoneIt(0)
          setLastPrompt(prompt)
          setPrompt(data.new_prompt.phrase)
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
          setPrompt(data.starting_game.phrase)
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
        <Title title="Never have i ever... ONLINE" socket={socket}/>
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
      <Title title="Never have i ever... ONLINE" socket={socket}/>
      <div className={styles.main_content}>
        <div className={styles.side_section}>
          <LastPrompt doneIt={doneIt} notDoneIt={notDoneIt} players={players} last_prompt={last_prompt}/>
        </div>

        <div className={styles.middle_section}><Game prompt={prompt} /></div>
        
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