import styles from "./style.module.css"

interface Props {
  prompt:string;
  location:string;
}

export const PromptDisplay = ({prompt, location}:Props) => {

  return (
      <div className={styles[location]}>
        <span className={styles.phrase}>{prompt}</span>
      </div>
  );
};