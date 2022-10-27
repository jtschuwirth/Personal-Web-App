import styles from "./style.module.css"

interface Props {
  prompt:string;
  height:string;
}

export const PromptDisplay = ({prompt, height}:Props) => {

  return (
      <div className={styles.phrase_container} style={{height:height}}>
        <span className={styles.phrase}>{prompt}</span>
      </div>
  );
};