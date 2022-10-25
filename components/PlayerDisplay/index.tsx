import styles from "./style.module.css"

interface Players {
    id: string;
    user_name:string;
    points:number;
    last_turn_points:number;
    turn_status:string;
  }

interface Props {
    players:Players[];
}

export const PlayerDisplay = ({players}:Props) => {

    return (
        <div className={styles.player_container}>
            <div className={styles.players_list}>
                <span className={styles.title}>Playing</span>
                <span className={styles.players}>{players.sort((a,b) => { return b.points-a.points })
                                                         .map((_) =><span key={_.id} className={styles[_.turn_status]}>{_.user_name}: {_.points}</span>)
                                                         }</span>
            </div>
        </div>
    );
  };