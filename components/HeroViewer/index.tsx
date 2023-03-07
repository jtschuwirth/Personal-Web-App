import styles from "./style.module.css"

interface Hero {
    heroId_: number
    owner: string
    override_: string
    profession_: string
    levelUp_: boolean
    primaryStat_:number
    secondaryStat_:number
    tertiaryStat_: number
}

interface Props {
    heroes: Hero[]
}

export const HeroViewer = ({heroes}:Props) => {
    return (
        <div className = {styles.hero_viewer}>
            <div className = {styles.profession_container}>
                {heroes.filter((_) => _.profession_ == "mining").map((_, index) => 
                <div key={index} className={styles.hero_container}>
                    <p>{_.heroId_}</p>
                    <p>{_.profession_}</p>
                    <p>{_.override_}</p>

                </div>)}
            </div>
            <div className = {styles.profession_container}>
                {heroes.filter((_) => _.profession_ == "fishing").map((_, index) => 
                <div key={index} className={styles.hero_container}>
                    <p>{_.heroId_}</p>
                    <p>{_.profession_}</p>
                    <p>{_.override_}</p>

                </div>)}
            </div>
            <div className = {styles.profession_container}>
                {heroes.filter((_) => _.profession_ == "foraging").map((_, index) => 
                <div key={index} className={styles.hero_container}>
                    <p>{_.heroId_}</p>
                    <p>{_.profession_}</p>
                    <p>{_.override_}</p>

                </div>)}
            </div>
        </div>
        

    );
  };