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
  align-items: start;
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
    const from = source.index;
    const to = destination.index;

    if(destination.droppableId === source.droppableId) {
      
      setArr((oldBoard) => {
        const copied = [...oldBoard[source.droppableId]];
        const elem = copied[from];
        copied.splice(from, 1);
        copied.splice(to, 0, elem);
        return { ...oldBoard, [source.droppableId]: copied }; //변수를 키 값에 넣을 때 [ ] 안에 넣는다.
      });
    } else {
      setArr((oldBoard) => {
        const removed = [...oldBoard[source.droppableId]];
        const added = [...oldBoard[destination.droppableId]];
        const elem = removed[from];
        removed.splice(from, 1);
        added.splice(to, 0, elem);
        return { ...oldBoard, [source.droppableId]: removed, [destination.droppableId]: added };
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
