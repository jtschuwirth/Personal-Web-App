import styles from "./style.module.css"

interface Players {
    id: string;
    user_name:string;
    points:number;
    last_turn_points:number;
    turn_status:string;
  }

interface Props {
    doneIt:number;
    notDoneIt:number;
    players:Players[];
    last_prompt:string;
}

export const LastPrompt = ({doneIt, notDoneIt, players, last_prompt}:Props) => {

    return (
        <div className={styles.last_prompt}>
          <span className={styles.title}>Last Round Points</span>
          <div className={styles.player_container}>
                <div className={styles.players_list}>
                    <span className={styles.title}>Last turn points</span>
                    <span className={styles.players}>{players.sort((a,b) => a.user_name.localeCompare(b.user_name))
                                                         .map((_) =><span key={_.id}>{_.user_name} (+{_.points-(_.last_turn_points||0)})</span>)
                                                         }</span>

                </div>
          </div>
          <span className={styles.title}>Last Round Prompt and Results</span>
          <div className={styles.player_container}>
            <div className={styles.players_list}>
            <span className={styles.prompt}>{last_prompt}</span>
            <div className={styles.answer_container}>
              <div className={styles.box1}>{doneIt}</div>
              <div className={styles.box2}>{notDoneIt}</div>
            </div>
            </div>
          </div>
        </div>
    );
  };