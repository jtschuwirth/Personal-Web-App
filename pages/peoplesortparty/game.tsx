import type { NextPage } from 'next'
import { useState, useEffect } from "react";
import styles from '../../styles/Online.module.css'
import { Foot } from "../../components/Foot"
import { Title } from '../../components/TitleContainer';
import { Game } from "../../components/GamePlayerPeopleSort";
import { useSocket } from '../../hooks/useSocket';
import { SimpleForm } from '../../components/SimpleForm';
import { useRouter } from "next/router"

const GamePage: NextPage = () => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const router = useRouter()
  const socket = useSocket(name&&room?`wss://cwap247wcg.execute-api.us-east-1.amazonaws.com/production?name=${name}&room=${room}`:null)

  useEffect(() => {
    window.onbeforeunload = function() {
      if (socket) {
        socket.onclose = function () {}; // disable onclose handler first
        socket.close();
      }
    };
  },[socket, router, setRoom])

  function onSubmit(event:any) {
    event.preventDefault()
    if (event.target.name_input.value.length<12 ) {
      if (event.target.room_input.value) {
        setRoom(event.target.room_input.value.toUpperCase())
      } else {
        setRoom(event.target.room_input.defaultValue.toUpperCase())
      }
      setName(event.target.name_input.value)
    } else return;
  }

  if (name==="") {
    return (
      <div className={styles.main}>
          <Title title="People Sort Party Mode" socket={socket}/>
          <SimpleForm onSubmit={onSubmit} inputs={[{title:"Name",name:"name_input"},{title:"Room Code",name:"room_input", defaultValue: router.query.room}]}/>
        <Foot />
      </div>
    )
  } else {
    return (
      <div className={styles.main}>
          <Title title="People Sort Party Mode" socket={socket} />
          <Game socket={socket}/>
        <Foot />
      </div>
    )
  }
}

export default GamePage