import type { NextPage } from 'next'
import styles from '../styles/Online.module.css'
import { Foot } from "../components/Foot"
import { Title } from '../components/TitleContainer';
import { useRouter } from 'next/router'

const NuncaNunca: NextPage = () => {
  const router = useRouter()

  return (
    <div className={styles.main}>
        <Title title="Never have i ever Party Mode" />
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={() => router.push("/nuncanuncaparty/host")}>HOST</button>
          <button className={styles.btn} onClick={() => router.push("/nuncanuncaparty/game")}>PLAY</button>
        </div>
      <Foot />
    </div>

  )
}

export default NuncaNunca