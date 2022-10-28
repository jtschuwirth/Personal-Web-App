import type { NextPage } from 'next'
import styles from '../styles/Online.module.css'
import { Foot } from "../components/Foot"
import { Title } from '../components/TitleContainer';
import { useRouter } from 'next/router'

const NuncaNunca: NextPage = () => {
  const router = useRouter()

  return (
    <div className={styles.main}>
        <Title title="People sort Party Mode" />
        <div className={styles.buttons}>
            <button className={styles.btn} onClick={() => router.push("/peoplesortparty/host")}>HOST</button>
            <button className={styles.btn} onClick={() => router.push("/peoplesortparty/game")}>PLAY</button>
        </div>
      <Foot />
    </div>

  )
}

export default NuncaNunca