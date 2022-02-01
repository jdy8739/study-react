import React, { useState } from 'react';
import { connect } from 'react-redux';
import { store, ITodo } from './store';

const ADD = 'ADD';
const DEL = 'DEL';

function App({ todoList }: { todoList: ITodo[] }) {
  console.log(todoList);

  const [ text, setText ] = useState('');
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(text === '') return;
    store.dispatch({ type: ADD, todo: text });
    setText('');
  };

  const delTodo = (id: number) => {
    store.dispatch({ type: DEL, id: id });
  };

  //const todoList = store.getState();
  //store.subscribe(() => console.log(todoList.length));

  return (
    <div className="App">
      <form onSubmit={ addTodo }>
        <input onChange={ handleOnChange } value={ text }/>
        <button>ADD</button>
      </form>
      {
        todoList.map(todo => {
          return (
            <>
              <span key={todo.id} style={{ display: 'flex' }}>
                <p>{ todo.todo }</p>
                &emsp;
                <button onClick={ () => { delTodo(todo.id) } }>DEL</button>
              </span>
            </>
          )
        })
      }
    </div>
  );
}

function mapStateToProps(state: ITodo[]) {
  console.log(state);
  return { todoList: state };
}

export default connect(mapStateToProps)(App);
