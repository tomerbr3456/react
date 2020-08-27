import React, { useState, createContext, } from 'react';
export const TodoListContext = createContext()
export const CategoryOptionsContext = createContext()


const INITIALIZE_TODO_LIST = [{ id: 1, name: "GUY", isActive: true, Category: "Friends" },
{ id: 66777, name: "GUY2", isActive: true, Category: "Sport" },
{ id: 2, name: "GUY3", isActive: false, Category: "Study" }]

const MAIN_LIST_STATE_INITIAL_VALUES = {
  INITIALIZE_TODO_LIST,
  searchedName: '',
  searchedCategory: '',
}
const INITIALIZE_CATEGORY_OPTIONS = ["sports", "friends", "study", "all"];


export const CategoryOptionsProvider = (props) => {
  const [CategoryOptions, setCategoryOptions] = useState(INITIALIZE_CATEGORY_OPTIONS)

  return (
    <CategoryOptionsContext.Provider value={[CategoryOptions, setCategoryOptions]}>
      {props.children}
    </CategoryOptionsContext.Provider>
  )
}

export const ToDoListProvider = (props) => {
  const [todoList, setTodoList] = useState(MAIN_LIST_STATE_INITIAL_VALUES.INITIALIZE_TODO_LIST)

  return (
    <TodoListContext.Provider value={[todoList, setTodoList]}>
      {props.children}
    </TodoListContext.Provider>
  )
}