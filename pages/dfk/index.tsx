import type { NextPage } from 'next'
import { useState } from "react"
import { useQuery } from 'react-query'
import { Foot } from "../../components/Foot"
import { SimpleForm } from '../../components/SimpleForm-dfk'
import { HeroViewer } from '../../components/HeroViewer'
import styles from '../../styles/DFK.module.css'

async function getHeroes(address: String|null) {
  if (!address) return
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };

    let res = await fetch(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/dfk/heroes?address=${address}`, config)
    return res.json()
}

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
      Heroes:
      <HeroViewer heroes={heroes.isSuccess?heroes.data.heroes:[]}/>

      </div>
      <Foot />
    </div>

  )
}

export default DFK
