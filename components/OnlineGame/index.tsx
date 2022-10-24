import styles from "./style.module.css"

interface Props {
  prompt:string;
}

export const Game = ({prompt}:Props) => {

  return (
    <div className={styles.game_container}>
      <div className={styles.phrase_container}>
        <span className={styles.phrase}>{prompt}</span>
      </div>
    </div>

  );
};