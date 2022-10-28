import styles from "./style.module.css"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { memo } from "react"

interface Player {
    id?: string;
    user_name:string;
    distance?:number;
    points?:number;
    last_turn_points?:number;
    turn_status?:string;
  }

interface Props {
    players:Player[]
    setPlayers:any;
    prompt: {max:string, min:string}
}

const Player = ({ user_name, index, key }:{user_name:string, index:number, key:string}) => {
    return (
      <Draggable draggableId={user_name} index={index} key={user_name} >
        {(provided:any) => (
            <div
                key={key}
                className={styles.entry} 
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {user_name}
            </div>
        )}
      </Draggable>
    );
  }

const PlayerList = memo(function PlayerList({ players }:any) {
    return players.map((_:Player, index:number) => <Player user_name={_.user_name} index={index} key={_.user_name}/>)
})


export const PlayerStack = ({players, setPlayers, prompt}:Props) => {

    const reorder = (list:any, startIndex:any, endIndex:any) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };
    
    function onDragEnd(result:any) {
        if (!result.destination) {
            return;
          }
        if (result.destination.index === result.source.index) {
            return;
          }
        const new_list = reorder(players, result.source.index, result.destination.index)
        console.log(new_list)
        setPlayers(new_list)
      }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided:any) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={styles.stack}>
                    <div className={styles.prompt}>{prompt.max}</div>
                    <PlayerList players={players} />
                    <div className={styles.prompt}>{prompt.min}</div>
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
    );
  };