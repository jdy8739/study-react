import { createStore } from 'redux';

export interface ITodo {
  todo: string,
  id: number,
  state: string
}

const ADD = 'ADD';
const DEL = 'DEL';

const reducer = (state: ITodo[] = [], action: any) => {
  switch(action.type) {
    case ADD:
      const updateTodos = [ ...state, { todo: action.todo, id: Date.now(), state: 'TO_DO' } ];
      return updateTodos;
    case DEL:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

export const store = createStore(reducer);

console.log(store);