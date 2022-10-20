import { MdOutlineArrowBackIosNew } from "react-icons/md"
import styles from "./style.module.css"
import { useRouter } from 'next/router'

interface Props {
    title:string;
    socket?:WebSocket|undefined
}

export const Title = ({title, socket}:Props) => {
    const router = useRouter()

    function handleClick() {
      if (socket) {
        socket.close();
      }
      router.push("/")

    }

    return (
        <div className={styles.title_container} onClick={() => handleClick()}>
          <MdOutlineArrowBackIosNew size={20} />
          <span className={styles.page_title}>{title}</span>
        </div>
    );
  };