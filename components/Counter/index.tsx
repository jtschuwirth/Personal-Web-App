import styles from "./style.module.css"

interface Props {
    count:number;
    setCount:any;
}

export const Counter = ({count, setCount}:Props) => {
    return (
        <div className={styles.counter}>
            <button className={styles.counter_btn} onClick={() => setCount((count:number) => count-1)}>-</button>
            {count}
            <button className={styles.counter_btn} onClick={() => setCount((count:number) => count+1)}>+</button>
        </div>

    );
  };