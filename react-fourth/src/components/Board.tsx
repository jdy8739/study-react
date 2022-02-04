import styled from "styled-components"
import { Droppable } from "react-beautiful-dnd";
import Todo from "./Todo";

const BoardForm = styled.div`
  height: 95%;
  background-color: #eee;
  border-radius: inherit;
  margin: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 12px 8px;
  box-sizing: border-box;
`;

function Board({ todo, droppableId }: { todo: string[], droppableId: string }) {
    return (
        <>  
            <Droppable droppableId={ droppableId }>
              {
                (provided) =>
                <BoardForm ref={ provided.innerRef } { ...provided.droppableProps }>
                    <h3>{ droppableId }</h3>
                    {
                        todo.map((item, i) => {
                            return (
                                <>
                                    <Todo item={ item } index={ i } todoId={droppableId} key={ i }/>
                                </>
                            )
                        })
                    }
                    { provided.placeholder }
                </BoardForm>
              }
            </Droppable>
        </>
    )
}

export default Board;