import styled from "styled-components"
import { Droppable } from "react-beautiful-dnd";
import Todo from "./Todo";
import { useForm } from 'react-hook-form';
import { arr, ITodoElem } from '../atoms';
import { useSetRecoilState } from "recoil";

interface IDrag {
    draggingFromThisWith: boolean,
    isDraggingOver: boolean
}

const BoardForm = styled.div<IDrag>`
  transition: all 1s;
  background-color: ${ props => props.isDraggingOver ? 'red' : props.draggingFromThisWith ? 'teal' : '#eee' };
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

interface ITodo {
    todo: string
};


function Board({ todo, droppableId }: { todo: ITodoElem[], droppableId: string }) {

    const { register, setValue, handleSubmit } = useForm<ITodo>();
    const setTodoArr = useSetRecoilState(arr);

    const onValid = (e: ITodo) => {
        const newValue = e.todo;
        setTodoArr((oldTodos) => {
            const newTodo = { todo: newValue, id: Date.now() };
            return {
                ...oldTodos,
                [droppableId]: [ ...oldTodos[droppableId], newTodo ]
            };
        });
        setValue('todo', '');
    };


    return (
        <>  
            <Droppable droppableId={ droppableId }>
              {
                (provided, snapchat) =>
                <BoardForm ref={ provided.innerRef } 
                { ...provided.droppableProps } 
                isDraggingOver={ snapchat.isDraggingOver }
                draggingFromThisWith={ Boolean(snapchat.draggingFromThisWith) }
                >
                    <Title>{ droppableId }</Title>
                    <form onSubmit={handleSubmit(onValid)}>
                        <input { ...register('todo', { 
                            required: 'Input this todo!'
                        }) } 
                        type='text'
                        placeholder={`input your ${ droppableId }.`}
                        />
                        <button>ADD</button>
                    </form>
                    {
                        todo.map((item, i) => {
                            return (
                                <>
                                    <Todo item={ item.todo } index={ i } todoId={ droppableId } key={ i }/>
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