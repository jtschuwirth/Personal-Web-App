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
    last_prompt:string;
}

export const LastPrompt = ({doneIt, notDoneIt, last_prompt}:Props) => {

    return (
        <div className={styles.last_prompt}>
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