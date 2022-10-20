import type { NextPage } from 'next'
import { useState, useEffect, useRef } from "react";
import styles from '../../styles/Online.module.css'
import { Foot } from "../../components/Foot"
import { Title } from '../../components/TitleContainer';
import { Game } from "../../components/OnlinePlayer";

const GamePage: NextPage = () => {
  const [name, setName] = useState("");
  const [socket, setSocket] = useState<WebSocket>()
  const runs = useRef(0)



  useEffect(() => {
    if (name!=="" && !runs.current) {
      const newSocket = new WebSocket(`wss://9s9l3p7u9a.execute-api.us-east-1.amazonaws.com/dev?name=${name}`)
      setSocket(newSocket)
      runs.current=1
    }
    window.onbeforeunload = function() {
      if (socket) {
        socket.onclose = function () {}; // disable onclose handler first
        socket.close();
      }
    };
  },[name, runs, setSocket])

  function onSubmit(event:any) {
    event.preventDefault()
    setName(event.target.name_input.value)
  }

  if (name==="") {
    return (
      <div className={styles.main}>
          <Title title="Never have i ever... ONLINE" socket={socket}/>
            <form onSubmit={onSubmit} className={styles.select_name_container}>
              <span>Pick a Name</span>
              <input className={styles.input} name="name_input"/>
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