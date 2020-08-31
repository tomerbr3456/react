import React, { useState, createContext, } from 'react';
export const TodoListContext = createContext()

// ושיהיה רק אחד כזה
export const INITIAL_TODO_LIST = [{ id: 1, name: "GUY", isActive: true, category: "Friends" },
{ id: 66777, name: "GUY2", isActive: true, category: "Sport" },
{ id: 2, name: "GUY3", isActive: false, category: "Study" }]

// MAIN LIST ???
const TODOS_INITIAL_VALUES = {
  INITIAL_TODO_LIST,
}
export const ToDoListProvider = (props) => {
  const [todoList, setTodoList] = useState(TODOS_INITIAL_VALUES.INITIAL_TODO_LIST)

  return (
    <TodoListContext.Provider value={[todoList, setTodoList]}>
      {props.children}
    </TodoListContext.Provider>
  )
}