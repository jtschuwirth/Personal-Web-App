import { FormEventHandler } from "react";
import styles from "./style.module.css"

interface Props {
    onSubmit: FormEventHandler;
    inputs: {title:string, name:string}[];
}

export const SimpleForm = ({onSubmit, inputs}:Props) => {


    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputs}>
                {inputs.map((_, index) => 
                    <div className={styles.input_container} key={index}>
                        <input className={styles.input} name={_.name} type="text" required/>
                        <label className={styles.label}>{_.title}</label>
                    </div>
                )}
            </div>
            <button className={styles.btn} type="submit">Submit</button>
        </form>
    );
  };