import styles from "./style.module.css"

interface Props {
    setView:any;
    view:number;
}

export const Selector = ({view, setView}: Props) => {

    return (
        <div className={styles.selector}>
            <button className={!view?styles.btn:styles.btn_selected} onClick={() => setView(1)}>Party Games</button>
            <button className={view?styles.btn:styles.btn_selected} onClick={() => setView(0)}>Other Games</button>
        </div>
    );
  };