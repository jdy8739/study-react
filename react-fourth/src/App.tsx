import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { minuteState, hourSelector, arr } from "./atoms";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import Todo from "./components/Todo";
import Board from "./components/Board";

const Boards = styled.div`
  width: 70vw;
  border-radius: 8px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;


function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const handleOnChangeMinutes = (e: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+e.currentTarget.value); //parseInt 효과임.
  };

  const handleOnChangeHours = (e: React.FormEvent<HTMLInputElement>) => {
    setHours(+e.currentTarget.value); //parseInt 효과임.
  };

  const [myArr, setArr] = useRecoilState(arr);

  const handleOnDragEnd = ({ destination, source }: any) => {
    if(destination.droppableId === source.droppableId) {
      const from = source.index;
      const to = destination.index;
      
      setArr((oldBoard) => {
        const copied = [...oldBoard[source.droppableId]];
        const elem = copied[from];
        copied.splice(from, 1);
        copied.splice(to, 0, elem);
        return { ...oldBoard, [source.droppableId]: copied };
      });
    }
  };

  return (
    <div className="App">
      <input placeholder="minutes" type="number" value={ minutes } onChange={ handleOnChangeMinutes }/>
      <input placeholder="hours" type="number" value={ hours.toFixed(1) } onChange={ handleOnChangeHours }/>

      <DragDropContext onDragEnd={ handleOnDragEnd }>
        <Boards>
            {
              Object.keys(myArr).map((todoId, i) => {
                return (
                  <>
                    <Board todo={ myArr[todoId] } droppableId={ todoId } key={todoId} />
                  </>
                )
              })
            }
        </Boards>
      </DragDropContext>
    </div>
  );
}

export default App;
