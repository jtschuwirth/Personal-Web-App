import { MdOutlineArrowBackIosNew } from "react-icons/md"
import styles from "./style.module.css"
import { useRouter } from 'next/router'

interface Props {
    title:string;
}

export const Title = ({title}:Props) => {
    const router = useRouter()

    return (
        <div className={styles.title_container} onClick={() => router.push("/")}>
          <MdOutlineArrowBackIosNew size={20} />
          <span className={styles.page_title}>{title}</span>
        </div>
    );
  };