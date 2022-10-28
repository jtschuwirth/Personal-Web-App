import styles from "./style.module.css"

interface Props {
    doneIt:number;
    notDoneIt:number;
    last_prompt:string;
}

export const LastPrompt = ({doneIt, notDoneIt, last_prompt}:Props) => {

    return (
          <div className={styles.player_container}>
            <span className={styles.prompt}>{last_prompt}</span>
            <div className={styles.answer_container}>
              <div className={styles.box1}>{doneIt}</div>
              <div className={styles.box2}>{notDoneIt}</div>
            </div>
          </div>
    );
  };