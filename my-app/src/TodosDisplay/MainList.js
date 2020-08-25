import React, { useState, useEffect, useMemo } from 'react';
import './App.css'
import AddItem from '../Header/AddItem';
import Filters from '../Filters/Filters';
import Todos from './Todos'
import { syncStateAndLocalStorage, updateLocalStorageByState } from '../GeneralFiles/localStorageManagment'

const todoList = [{ id: 1, name: "GUY", isActive: true, Category: "Friends" }, { id: 66777, name: "GUY2", isActive: true, Category: "Sport" }, { id: 2, name: "GUY3", isActive: false, Category: "Study" }]
const CategoryOptions = ["sports", "friends", "study"];

const MAIN_LIST_STATE_INITIAL_VALUES = {
  todoList,
  searchedName: '',
  searchedCategory: '',
}

const MainList = () => {
  const [searchedName, setSearchedName] = useState(MAIN_LIST_STATE_INITIAL_VALUES.searchedName)
  const [toDoList, setTodoList] = useState(MAIN_LIST_STATE_INITIAL_VALUES.todoList)
  const [searchedCategory, setSearchedCategory] = useState(MAIN_LIST_STATE_INITIAL_VALUES.searchedCategory)

  const updateTodo = (id, newTodo) => {
    const newList = toDoList.map(currentTodo => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          ...newTodo
        }
      }
      return currentTodo
    })
    setTodoList(newList)
  }

  const addNewItem = (nameToAdd) => {
    let newToDo = {
      id: toDoList[toDoList.length - 1].id + 1,
      name: nameToAdd, isActive: false, Category: "Sports"
    }
    setTodoList([...toDoList, newToDo])
  }

  const updateSearchedName = (searchedName) => {
    setSearchedName(searchedName)
  }

  const deleteToDo = (id) => {
    setTodoList(toDoList.filter(todo => todo.id !== id));
  }

  const handleChangeCategory = (searchedCategory) => {
    setSearchedCategory(searchedCategory)
  }

  useEffect(() => {
    const syncedState = syncStateAndLocalStorage(MAIN_LIST_STATE_INITIAL_VALUES)
    setTodoList(syncedState.todoList)
    setSearchedName(syncedState.searchedName)
    setSearchedCategory(syncedState.searchedCategory)
  }, []);

  useEffect(() => {
    const mainListState = { searchedCategory, searchedName, toDoList }
    updateLocalStorageByState(mainListState)
  }, [toDoList, searchedName, searchedCategory]);

  const filteredTodosByName = useMemo(() => {
    debugger
    return toDoList.filter((currentTodo) => currentTodo.name.toLowerCase().includes(searchedName.toLowerCase()))
  }, [toDoList, searchedName]
  );

  const filteredTodosByNameAndCategory = useMemo(() =>
    filteredTodosByName.filter(currentTodo => currentTodo.Category.toLowerCase() === searchedCategory)
    , [searchedCategory, filteredTodosByName])

  return (
    <div className="Page" >
      <h1 className="headerStyle">ToDoList</h1>
      <Filters CategoryOptions={CategoryOptions}
        handleChangeCategory={handleChangeCategory}
        searchedName={searchedName}
        searchedCategory={searchedCategory} updateSearchedName={updateSearchedName} />
      <AddItem addNewItem={addNewItem} />
      <Todos Todos={filteredTodosByNameAndCategory}
        updateTodo={updateTodo}
        deleteToDo={deleteToDo} />
    </div>
  )

}

export default MainList

