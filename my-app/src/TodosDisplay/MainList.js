import React, { useState, useEffect, useContext, useMemo } from 'react';
import './App.css'
import AddItem from '../Header/AddItem';
import Filters from '../Filters/Filters';
import Todos from './Todos'
import { syncStateAndLocalStorage, updateLocalStorageByState } from '../GeneralFiles/localStorageManagment'
import { TodoListContext } from '../GeneralFiles/StateManagment'

const todoList = [{ id: 1, name: "GUY", isActive: true, Category: "Friends" }, { id: 66777, name: "GUY2", isActive: true, Category: "Sport" }, { id: 2, name: "GUY3", isActive: false, Category: "Study" }]
const CategoryOptions = ["sports", "friends", "study", "all"];

const MAIN_LIST_STATE_INITIAL_VALUES = {
  todoList,
  searchedName: '',
  searchedCategory: '',
}

const MainList = () => {
  const [searchedName, setSearchedName] = useState(MAIN_LIST_STATE_INITIAL_VALUES.searchedName)
  const [todoList, setTodoList] = useContext(TodoListContext)
  const [searchedCategory, setSearchedCategory] = useState(MAIN_LIST_STATE_INITIAL_VALUES.searchedCategory)

  const updateTodo = (id, newTodo) => {

    const newList = todoList.map(currentTodo => {
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

  const updateSearchedName = (searchedName) => {
    setSearchedName(searchedName)
  }

  const handleChangeCategory = (searchedCategory) => {
    setSearchedCategory(searchedCategory)
  }

  useEffect(() => {
    const syncedState = syncStateAndLocalStorage(MAIN_LIST_STATE_INITIAL_VALUES)
    setTodoList(syncedState.todoList)
    setSearchedName(syncedState.searchedName)
    setSearchedCategory(syncedState.searchedCategory)
  }, [setTodoList]);

  useEffect(() => {
    const mainListState = { searchedCategory, searchedName, todoList }
    updateLocalStorageByState(mainListState)
  }, [todoList, searchedName, searchedCategory]);

  const filteredTodosByName = useMemo(() => {
    return todoList.filter((currentTodo) => currentTodo.name.toLowerCase().includes(searchedName.toLowerCase()))
  }, [todoList, searchedName]
  );

  const filteredTodosByNameAndCategory = useMemo(() =>
    filteredTodosByName.filter(currentTodo => {
      if (currentTodo.Category.toLowerCase() === searchedCategory || searchedCategory === 'all')
        return currentTodo
      return ''
    })
    , [searchedCategory, filteredTodosByName])

  return (
    <div className="Page" >
      <h1 className="headerStyle">ToDoList</h1>
      <Filters CategoryOptions={CategoryOptions}
        handleChangeCategory={handleChangeCategory}
        searchedName={searchedName}
        searchedCategory={searchedCategory} updateSearchedName={updateSearchedName} />
      <AddItem />
      <Todos Todos={filteredTodosByNameAndCategory}
        updateTodo={updateTodo} />
    </div>
  )

}

export default MainList

