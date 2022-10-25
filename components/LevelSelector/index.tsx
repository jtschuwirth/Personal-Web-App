import styles from "./style.module.css"
import { Dispatch, SetStateAction} from "react";

interface Props {
    level: number;
    setLevel: Dispatch<SetStateAction<number>>
    game:string;
    sendChangeLevel?:any;
}

export const LevelSelector  = ({level, setLevel, game, sendChangeLevel}:Props) => {

  function handleClick(value:number) {
    setLevel(value)
    if (sendChangeLevel) {
      sendChangeLevel(value)
    }
  }

  return (
    <div className={styles.btn_container}>
      <button className={level==1?styles[`btn_selected_${game}`]:styles[`btn_${game}`]} onClick={() => handleClick(1)}>Level 1</button>
      <button className={level==2?styles[`btn_selected_${game}`]:styles[`btn_${game}`]} onClick={() => handleClick(2)}>Level 2</button>
      <button className={level==3?styles[`btn_selected_${game}`]:styles[`btn_${game}`]} onClick={() => handleClick(3)}>Level 3</button>
    </div>

  );
};
