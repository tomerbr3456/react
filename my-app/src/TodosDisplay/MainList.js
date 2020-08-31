import React, { useState, useEffect, useContext, useMemo, } from 'react';
import AddItem from './AddItem';
import Filters from '../Filters/Filters';
import Todos from './Todos'
import { INITIAL_TODO_LIST } from '../StateManagment/TodoListState'
import { syncStateAndLocalStorage, updateLocalStorageByState } from '../LocalStorage/localStorageManagment'
import { TodoListContext } from '../StateManagment/TodoListState'
import { createUseStyles } from 'react-jss'
import { allFilter } from '../Filters/FilterConstants'
import { Link } from 'react-router-dom'

const useStyles = createUseStyles({
  "headerStyle": {
    "textAlign": "center",
    "height": "100px"
  },
  editCategories: {
    width: '10%',
    fontSize: '20px',
    backgroundColor: 'dodgerblue'
  }
})
// lo tov
const categories = ['sports', 'friends', 'study', allFilter];

const MAIN_LIST_STATE_INITIAL_VALUES = {
  todoList: INITIAL_TODO_LIST,
  searchedName: '',
  searchedCategory: '',
}

const MainList = () => {
  const [searchedName, setSearchedName] = useState(MAIN_LIST_STATE_INITIAL_VALUES.searchedName)
  const [todoList, setTodoList] = useContext(TodoListContext)
  const [searchedCategory, setSearchedCategory] = useState(MAIN_LIST_STATE_INITIAL_VALUES.searchedCategory)

  const updateTodo = (id, newTodo) => {
    const newList = todoList.map((currentTodo) => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          ...newTodo,
        }
      }
      return currentTodo
    })
    setTodoList(newList)
  }

  const updateSearchedName = (putSearchedName) => {
    setSearchedName(putSearchedName)
  }

  const handleDelete = (id) => {
    setTodoList(todoList.filter((currentTodo) => currentTodo.id !== id));
  }

  const handleChangeCategory = (putsearchedCategory) => {
    setSearchedCategory(putsearchedCategory)
  }

  const addNewToDo = (nameToAdd) => {
    const newToDo = {
      id: todoList[todoList.length - 1].id + 1,
      name: nameToAdd,
      isActive: false,
      category: '',
    }
    setTodoList([...todoList, newToDo])
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

  const filteredTodosByName = useMemo(() => todoList.filter(
    (currentTodo) => currentTodo.name.toLowerCase().includes(searchedName.toLowerCase()),
  ),
    [todoList, searchedName]);

  const filteredTodosByNameAndCategory = useMemo(() => filteredTodosByName.filter((currentTodo) => {
    // move 'all' into const in Filters folder in FilterConstants file and use it everywhere you use 'all'
    if (currentTodo.category.toLowerCase() === searchedCategory || searchedCategory === allFilter) {
      return true
    }
    return false
  }),
    [searchedCategory, filteredTodosByName])
  const classes = useStyles()

  return (
    <div>
      <h1 className={classes.headerStyle}>ToDoList</h1>
      <Link to="/Categories" className={classes.editCategories}>Edit Categories</Link>
      <Filters
        categories={categories}
        handleChangeCategory={handleChangeCategory}
        searchedName={searchedName}
        searchedCategory={searchedCategory}
        updateSearchedName={updateSearchedName}
      />
      <AddItem
        addNewItem={addNewToDo}
      />
      <Todos
        handleDelete={handleDelete}
        TodosList={filteredTodosByNameAndCategory}
        updateTodo={updateTodo}
      />
    </div>
  )
}
export default MainList
