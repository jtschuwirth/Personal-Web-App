import {AiFillGithub} from "react-icons/ai"
import styles from "./style.module.css"

interface Props {
    game:string;
}

export const Foot = ({game}:Props) => {

    return (
        <div className={styles[`github_icon_${game}`]} onClick={() => window.open("https://github.com/jtschuwirth")}>
            <AiFillGithub size={30}/>
            <span>jtschuwirth</span>
        </div>
    );
  };