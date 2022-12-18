import styles from "./style.module.css"

interface Hero {
    heroId_: number
    owner: string
    override_: string
    levelUp_: boolean
    primaryStat_:number
    secondaryStat_:number
    tertiaryStat_: number
}

interface Props {
    heroes: Hero[]
}

export const HeroViewer = ({heroes}:Props) => {
    console.log(heroes)
    return (
        <div>
            {heroes.map((_, index) => 
            <div key={index} className={styles.hero_container}>
                <p>{_.heroId_}</p>
                <p>{_.override_}</p>

            </div>)}
        </div>

    );
  };