import {AiFillGithub} from "react-icons/ai"
import styles from "./style.module.css"

export const Foot = () => {

    return (
        <div className={styles.github_icon} onClick={() => window.open("https://github.com/jtschuwirth")}>
            <AiFillGithub size={30}/>
            <span>jtschuwirth</span>
        </div>
    );
  };