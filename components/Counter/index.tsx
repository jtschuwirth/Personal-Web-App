import styles from "./style.module.css"

interface Props {
    count:number;
    setCount:any;
    max:number;
}

export const Counter = ({count, setCount, max}:Props) => {

    function handleCount(sum:number) {
        if (count === 0 && sum===-1) return;
        if (count===max && sum===1) return;
        setCount((count:number) => count+sum)
        }

    return (
        <div className={styles.counter}>
            <button className={styles.counter_btn} onClick={() => handleCount(-1)}>-</button>
            <div className={styles.counter_display}>{count}</div>
            <button className={styles.counter_btn} onClick={() => handleCount(+1)}>+</button>
        </div>

    );
  };