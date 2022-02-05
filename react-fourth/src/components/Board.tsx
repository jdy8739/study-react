import styled from "styled-components"
import { Droppable } from "react-beautiful-dnd";
import Todo from "./Todo";

const BoardForm = styled.div`
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

const Title = styled.h3`
    width: 100%; 
    text-align: center;
    align-self: start;
`;


function Board({ todo, droppableId }: { todo: string[], droppableId: string }) {
    return (
        <>  
            <Droppable droppableId={ droppableId }>
              {
                (provided) =>
                <BoardForm ref={ provided.innerRef } { ...provided.droppableProps }>
                    <Title>{ droppableId }</Title>
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