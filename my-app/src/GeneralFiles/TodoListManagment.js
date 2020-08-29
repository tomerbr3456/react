import React, { useState, createContext, } from 'react';
export const TodoListContext = createContext()

const INITIAL_TODO_LIST = [{ id: 1, name: "GUY", isActive: true, Category: "Friends" },
{ id: 66777, name: "GUY2", isActive: true, Category: "Sport" },
{ id: 2, name: "GUY3", isActive: false, Category: "Study" }]
const MAIN_LIST_STATE_INITIAL_VALUES = {
  INITIAL_TODO_LIST,
}
export const ToDoListProvider = (props) => {
  const [todoList, setTodoList] = useState(MAIN_LIST_STATE_INITIAL_VALUES.INITIAL_TODO_LIST)

  return (
    <TodoListContext.Provider value={[todoList, setTodoList]}>
      {props.children}
    </TodoListContext.Provider>
  )
}