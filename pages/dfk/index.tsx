import type { NextPage } from 'next'
import { useState } from "react"
import { useQuery } from 'react-query'
import { Foot } from "../../components/Foot"
import { SimpleForm } from '../../components/SimpleForm-dfk'
import { HeroViewer } from '../../components/HeroViewer'
import styles from '../../styles/DFK.module.css'
import { getHeroes, stopProfession, resumeProfession, updateHeroes } from '../../requests'

const DFK: NextPage = () => {
  const [address, setAddress] = useState(null)

  function onSubmit(event:any) {
    event.preventDefault()
    setAddress(event.target.address.value)
  }

  const heroes = useQuery("heroes",() => getHeroes(address), {enabled: !!address})

  return (
    <div className={styles.main}>
      <div className={styles.main_content}>
      <SimpleForm onSubmit={onSubmit} inputs={[{title:"Address",name:"address"}]}/>
      <button className={styles.button} onClick={() => {updateHeroes(address); heroes.refetch()}}>Update Heroes</button>
      <div className={styles.all_buttons}>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => {stopProfession(address, "mining"); heroes.refetch()}}>Stop Mining</button>
          <button className={styles.button} onClick={() => {resumeProfession(address, "mining"); heroes.refetch()}}>Resume Mining</button>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => {stopProfession(address, "fishing"); heroes.refetch()}}>Stop Fishing</button>
          <button className={styles.button} onClick={() => {resumeProfession(address, "fishing"); heroes.refetch()}}>Resume Fishing</button>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => {stopProfession(address, "foraging"); heroes.refetch()}}>Stop Foraging</button>
          <button className={styles.button} onClick={() => {resumeProfession(address, "foraging"); heroes.refetch()}}>Resume Foraging</button>
        </div>
      </div>
      Heroes:
      <HeroViewer heroes={heroes.isSuccess&&heroes.data?heroes.data?.data.heroes:[]}/>

      </div>
      <Foot />
    </div>

  )
}

export default DFK
