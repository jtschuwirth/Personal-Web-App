import {BiLike, BiDislike} from "react-icons/bi"
import { useState } from "react";
import axios from "axios"
import styles from "./style.module.css"

interface Props {
    level:number;
    phrase:string;
    setOpinion:any;
}

export const Opinion = ({phrase, level, setOpinion}:Props) => {

    async function sendOpinion(opinion:string) {
        if (phrase!=="") {
            let opinion_response
            if (opinion === "like") {
              opinion_response = 1
            } else {
              opinion_response = 0
            }
      
            const config = {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            }
            const data = {
              phrase: phrase,
              opinion: opinion_response,
              level: level
            }
      
            axios.post(`https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/nuncanunca/opinion`, data, config
            ).then( function(response) {
              console.log(response)
      
            }).catch( function(error) {
              console.log(error)
            })
          }
    }

    async function handleDislike() {
        setOpinion(1)
        sendOpinion("dislike")

      }
    
      async function handleLike() {
        setOpinion(1)
        sendOpinion("like")
      }

    return (
        <div className={styles.opinion_container}>
            <div 
              className={styles[`like_container_nuncanunca`]}
              onClick={() => handleDislike()}
              ><BiDislike size={20}/>
            </div>
            <div 
              className={styles[`like_container_nuncanunca`]}
              onClick={() => handleLike()}
              ><BiLike size={20}/>
            </div>
        </div>  
    );
  };