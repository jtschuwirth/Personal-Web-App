import type { NextPage } from 'next'
import { useState, useEffect, useRef } from "react";
import styles from '../../styles/Online.module.css'
import { Foot } from "../../components/Foot"
import { Title } from '../../components/TitleContainer';
import { Game } from "../../components/OnlinePlayer";

const GamePage: NextPage = () => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [socket, setSocket] = useState<WebSocket>()
  const runs = useRef(0)



  useEffect(() => {
    if (name!=="" && !runs.current) {
      const newSocket = new WebSocket(`wss://2mgs44ly30.execute-api.us-east-1.amazonaws.com/production?name=${name}&room=${room}`)
      setSocket(newSocket)
      runs.current=1
    }

    window.onbeforeunload = function() {
      if (socket) {
        socket.onclose = function () {}; // disable onclose handler first
        socket.close();
      }
    };
  },[name, runs, setSocket, socket, room])

  function onSubmit(event:any) {
    event.preventDefault()
    if (event.target.name_input.value.length<12 ) {
      setName(event.target.name_input.value)
      setRoom(event.target.room_input.value.toUpperCase())
    } else return;
  }

  if (name==="") {
    return (
      <div className={styles.main}>
          <Title title="Never have i ever... ONLINE" socket={socket}/>
            <form onSubmit={onSubmit} className={styles.select_name_container}>
              <span className={styles.pick_name}>Choose a Name</span>
              <input className={styles.input} name="name_input"/>
              <span className={styles.pick_name}>Enter the room code</span>
              <input className={styles.input} name="room_input"/>
              <button className={styles.btn} type="submit">Join Game</button>
            </form>

  
        <Foot />
      </div>
    )
  } else {
    return (
      <div className={styles.main}>
          <Title title="Never have i ever... ONLINE" socket={socket} />
          <Game socket={socket}/>
        <Foot />
      </div>
    )
  }
}

export default GamePage