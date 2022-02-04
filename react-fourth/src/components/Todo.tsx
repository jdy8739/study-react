import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
  width: 175px;
  height: 40px;
  background-color: white;
  border-radius: 8px;
  margin: 4px;
`;


function Todo({ index, item, todoId }: { index: number, item: string, todoId: string}) {
    // console.log(index);
    return (
        <>
            <Draggable draggableId={ todoId + '' + index } index={ index }>
                {
                (provided) => 
                <Card
                    ref={provided.innerRef}
                    { ...provided.dragHandleProps }
                    { ...provided.draggableProps }
                >
                    { item }
                </Card>
                }
            </Draggable>
        </>
    )
}

export default React.memo(Todo);