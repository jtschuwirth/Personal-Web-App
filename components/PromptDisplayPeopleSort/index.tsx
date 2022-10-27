import styles from "./style.module.css"

interface Props {
  prompt:{max:string,min:string};
}

export const PromptDisplay = ({prompt}:Props) => {

  return (
      <div className={styles.phrase_container}>
        <span className={styles.phrase}>{prompt.max}</span>
        <span className={styles.phrase}>{prompt.min}</span>
      </div>

  );
};