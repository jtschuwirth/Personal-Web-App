import styles from "./style.module.css"

interface Players {
    id: string;
    user_name:string;
    points:number;
    last_turn_points:number;
    turn_status:string;
  }

interface Props {
    prompt:{max:string, min:string};
}

export const LastPrompt = ({prompt}:Props) => {

    return (
        <div className={styles.last_prompt}>
          <span className={styles.title}>Last Round Prompt and Results</span>
          <div className={styles.player_container}>
            <div className={styles.players_list}>
              <span className={styles.prompt}>{prompt.max}</span>
              <span className={styles.prompt}>{prompt.min}</span>
            </div>
          </div>
        </div>
    );
  };