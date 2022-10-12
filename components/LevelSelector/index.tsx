import styles from "./style.module.css"
import { Dispatch, SetStateAction} from "react";

interface Props {
    level: number;
    setLevel: Dispatch<SetStateAction<number>>
}

export const LevelSelector  = ({level, setLevel}:Props) => {

  return (
    <div className={styles.btn_container}>
      <button className={level==1?styles.btn_selected:styles.btn} onClick={() => setLevel(1)}>Level 1</button>
      <button className={level==2?styles.btn_selected:styles.btn} onClick={() => setLevel(2)}>Level 2</button>
      <button className={level==3?styles.btn_selected:styles.btn} onClick={() => setLevel(3)}>Level 3</button>
    </div>

  );
};
