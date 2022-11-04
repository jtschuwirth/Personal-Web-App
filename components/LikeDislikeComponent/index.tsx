import {BiLike, BiDislike} from "react-icons/bi"
import styles from "./style.module.css"
import { useState } from "react"

interface Props {
    handle_like: Function;
    handle_dislike: Function
}

export const LikeDislikeComponent = ({handle_like, handle_dislike}:Props) => {
  const [opinion, setOpinion] = useState("")
  
  function handleClick(value:string) {
    if (value === "like" && opinion!=="like") {
      handle_like()
      setOpinion(value)
    } else if (value === "like") {
      setOpinion("")
    } else if (value==="dislike" && opinion!=="dislike") {
      handle_dislike()
      setOpinion(value)
    } else if (value === "dislike") {
      setOpinion("")
    }

  }

  return (
        <div className={styles.opinion_container}>
            <div 
              className={opinion==="dislike"?styles.like_container_active:styles.like_container}
              onClick={() => handleClick("dislike")}
              ><BiDislike size={20}/>
            </div>
            <div 
              className={opinion==="like"?styles.like_container_active:styles.like_container}
              onClick={() => handleClick("like")}
              ><BiLike size={20}/>
            </div>
        </div>  
    );
  };