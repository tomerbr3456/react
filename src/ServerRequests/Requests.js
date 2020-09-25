// dont use node-fetch in client side
// const fetch = require('node-fetch')
// import react, { useContext } from 'react';
// import { TodoListContext } from '../StateManagment/TodoListState'
// const [todoList, setTodoList] = useContext(TodoListContext)


export async function postNewTodo(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}



export async function deleteTodoMethod(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.json();
}


export async function putUpdatedTodo(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}





