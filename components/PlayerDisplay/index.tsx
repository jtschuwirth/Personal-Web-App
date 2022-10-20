import styles from "./style.module.css"

interface Players {
    id: string;
    user_name:string;
    points:number;
  }

interface Props {
    playing_players:Players[];
    done_players:Players[]
}

export const PlayerDisplay = ({playing_players, done_players}:Props) => {

    return (
        <div className={styles.player_container}>
            <div className={styles.players_list}>
                <span>Playing</span>
                <span className={styles.players}>{playing_players.map((_) =><span>{_.user_name}: {_.points}</span>)}</span>
            </div>
            <div className={styles.players_list}>
                <span>Done</span>
                <span className={styles.players}>{done_players.map((_) =><span>{_.user_name}: {_.points}</span>)}</span>
            </div>
        </div>
    );
  };