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
  const [level, setLevel] = useState(1);
  const [players, setPlayers] = useState<Players[]>([])
  const [doneIt, setDoneIt] = useState(0)
  const [notDoneIt, setNotDoneIt] = useState(0)
  const [socket, setSocket] = useState<WebSocket>()
  const [last_prompt, setLastPrompt] = useState("");
  const runs = useRef(0)
  const Ref = useRef({
    handleNewTurn: () => console.log("ref"),
  }) 

  useEffect(() => {
    if (!runs.current) {
      Ref.current.handleNewTurn()
      const newSocket = new WebSocket("wss://9s9l3p7u9a.execute-api.us-east-1.amazonaws.com/dev?name=host&host=1")
      setSocket(newSocket)
      runs.current=1

      newSocket.onmessage = (event) => {
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
          Ref.current.handleNewTurn()

        } 
      };
  
      window.onbeforeunload = function() {
        newSocket.onclose = function () {}; // disable onclose handler first
        newSocket.close();
      };
    }
  }, [runs]);


  return (
    <div className={styles.main}>
      <div className={styles.main_title}>
      <Title title="Never have i ever... ONLINE" socket={socket}/>
      <div className={styles.main_content}>
        <div className={styles.side_section}>
          <LastPrompt doneIt={doneIt} notDoneIt={notDoneIt} players={players} last_prompt={last_prompt}/>
        </div>
        <div className={styles.middle_section}>

          <LevelSelector level={level} setLevel={setLevel} game="nuncanunca"/>
          <Game 
            level={level} 
            game="nuncanunca"
            ref={Ref}
            setLastPrompt={setLastPrompt}
            />
        </div>
        <div className={styles.side_section}>
         <PlayerDisplay players={players}/>
        </div>
        </div>
        </div>
      <Foot />
      
    </div>

  )
}

export default Host