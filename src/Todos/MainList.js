import React, { useState, useEffect, useContext, useCallback } from 'react';
import AddItem from './AddItem';
import Filters from '../Filters/Filters';
import { INITIAL_TODO_LIST } from '../StateManagment/TodoListState'
import { updateLocalStorageByState } from '../LocalStorage/localStorageManagment'
import { TodoListContext } from '../StateManagment/TodoListState'
import * as TodosApi from '../Api/todos-api'
//import { FilteredTodosContext } from '../StateManagment/FilteredTodosContext'
import { createUseStyles } from 'react-jss'
//import { allFilter } from '../Filters/FilterConstants'
import { Link } from 'react-router-dom'
import SortableTodoContainer from './SortableTodoContainer';

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

const MAIN_LIST_STATE_INITIAL_VALUES = {
  todoList: INITIAL_TODO_LIST,
  searchedName: '',
  searchedCategory: '',
}

const MainList = () => {
  const [searchedName, setSearchedName] = useState(MAIN_LIST_STATE_INITIAL_VALUES.searchedName)
  const [todoList, setTodoList] = useContext(TodoListContext)
  const [searchedCategory, setSearchedCategory] = useState(MAIN_LIST_STATE_INITIAL_VALUES.searchedCategory)
  //const [filteredTodos, setFilteredTodos] = useContext(FilteredTodosContext)

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

    TodosApi.updateTodo(`http://localhost:5000/api/todos/${id}`, { ...newTodo, id: id, sort: id, active: newTodo.isActive, category: newTodo.category })
      .catch(err => {
        throw err
      });
  }

  const updateSearchedName = (putSearchedName) => {
    setSearchedName(putSearchedName)
  }

  const handleDelete = (id) => {
    TodosApi.deleteTodo(`http://localhost:5000/api/todos/${id}`, { id })
      .then(() => {
        setTodoList(todoList.filter((currentTodo) => currentTodo.id !== id))
      }).catch(err => {
        throw err
      })
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
      sortIndex: todoList[todoList.length - 1].sortIndex + 1
    }
    setTodoList([...todoList, newToDo])


    TodosApi.addTodo('http://localhost:5000/api/todos',
      { ...newToDo, sort: newToDo.id, active: false, category: 'sports' })

  }

  const sortTodosByIndex = useCallback(() => {
    function compare(a, b) {
      const todoA = a.sortIndex;
      const todoB = b.sortIndex;
      let comparison = 0;
      if (todoA > todoB) {
        comparison = 1;
      } else if (todoA < todoB) {
        comparison = -1;
      }
      return comparison;
    }
    setTodoList(todoList.sort(compare));
  }, [setTodoList, todoList])


  const getTodos = useCallback(async () => {
    await fetch('http://localhost:5000/api/todos').then(r => r.json())
      .then(res => { setTodoList(res) }).catch(err => {
        throw err
      })
  }, [setTodoList])



  useEffect(() => {
    getTodos()
  }, [setTodoList, getTodos]);

  useEffect(() => {
    const mainListState = { searchedCategory, searchedName }
    updateLocalStorageByState(mainListState)
  }, [todoList, searchedName, searchedCategory, setTodoList, sortTodosByIndex]);

  const classes = useStyles()

  return (
    <div>
      <h1 className={classes.headerStyle}>ToDoList</h1>
      <Link to="/Categories" className={classes.editCategories}>Edit Categories</Link>
      <Filters
        handleChangeCategory={handleChangeCategory}
        searchedName={searchedName}
        searchedCategory={searchedCategory}
        updateSearchedName={updateSearchedName}
      />
      <AddItem
        addNewItem={addNewToDo}
      />
      <SortableTodoContainer
        sortTodosByIndex={sortTodosByIndex}
        handleDelete={handleDelete}
        updateTodo={updateTodo}
      />
    </div>
  )
}
export default MainList