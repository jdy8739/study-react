import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
  width: 175px;
  height: 40px;
  background-color: white;
  border-radius: 8px;
  margin: 4px;
  background-color: ${ props => props.isDragging ? 'pink' : 'white' };
  box-shadow: ${ props => props.isDragging ? '0px 0px 5px rgba(0, 0, 0, 0.5)' : 'none' };
`;


function Todo({ index, item, todoId }: { index: number, item: string, todoId: string}) {
    // console.log(index);
    return (
        <>
            <Draggable draggableId={ todoId + '' } index={ index } key={ todoId + '' }>
                {
                (provided, snapchat) => 
                <Card
                    ref={provided.innerRef}
                    { ...provided.dragHandleProps }
                    { ...provided.draggableProps }
                    isDragging={ snapchat.isDragging }
                >
                    { item }
                </Card>
                }
            </Draggable>
        </>
    )
}

export default React.memo(Todo);