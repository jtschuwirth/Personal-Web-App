import type { NextPage } from 'next'
import { useState, useEffect, useRef } from "react";
import styles from '../../styles/WNRS.module.css'
import { Game } from '../../components/OnlineGame'
import { LevelSelector } from "../../components/LevelSelector"
import { Foot } from "../../components/Foot"
import { Title } from '../../components/TitleContainer';
import { PlayerDisplay } from "../../components/PlayerDisplay"


interface Players {
  id: string;
  user_name:string;
  points:number;
}

const Host: NextPage = () => {
  const [level, setLevel] = useState(1);
  const [playing_players, setPlayingPlayers] = useState<Players[]>([])
  const [done_players, setDonePlayers] = useState<Players[]>([])
  const runs = useRef(0)
  const handleNewTurn = useRef({
    handleNewTurn: () => console.log("ref")
  }) 

  useEffect(() => {
    if (!runs.current) {
      handleNewTurn.current.handleNewTurn()
      const socket = new WebSocket("wss://9s9l3p7u9a.execute-api.us-east-1.amazonaws.com/dev?name=host&host=1")
      runs.current=1

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data?.new_connection) {
          setPlayingPlayers((players) => [...players, data.new_connection])

        } else if ((data?.disconnected)) {
          setPlayingPlayers((players) => players.filter((_) => _.id!==data.disconnected))
          setDonePlayers((players) => players.filter((_) => _.id!==data.disconnected))

        } else if (data.turn_end) {
          setPlayingPlayers((players) => players.filter((_) => _.id!==data.turn_end.id))
          setDonePlayers((players) => [...players, data.turn_end])

        } else if (data?.round_end) {
          setPlayingPlayers([])
          data.round_end.map((_:any) => setPlayingPlayers((players) => [...players, {id:_.connection_id, user_name:_.user_name, points:_.points}]))
          setDonePlayers([])
          handleNewTurn.current.handleNewTurn()

        } 
      };
  
      window.onbeforeunload = function() {
        socket.onclose = function () {}; // disable onclose handler first
        socket.close();
      };
    }
  }, [runs]);


  return (
    <div className={styles.main}>
      <div className={styles.main_content}>
        <Title title="Never have i ever... ONLINE" />
        <LevelSelector level={level} setLevel={setLevel} game="nuncanunca"/>
        <Game 
          level={level} 
          game="nuncanunca"
          ref={handleNewTurn}
          />
          <PlayerDisplay playing_players={playing_players} done_players={done_players} />
        </div>
      <Foot />
    </div>

  )
}

export default Host