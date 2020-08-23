
import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddItem from './AddItem';
import Filters from './Filters';
import Todos from './Todos'

const toDoList = [{ id: 1, name: "GUY", isActive: true, Category: "Friends" }, { id: 66777, name: "GUY2", isActive: true, Category: "Sport" }, { id: 2, name: "GUY3", isActive: false, Category: "Study" }]
const CategoryOptions = ["sports", "friends", "study"];

export const syncStateAndLocalStorage = (mainListState) => {
  const localStorageValues = {}
  const stateKeys = Object.keys(mainListState)

  stateKeys.forEach(stateKeys => {
    if (localStorage.getItem(stateKeys) === null) {
      const stringKeyValue = JSON.stringify(mainListState[stateKeys])
      localStorage.setItem(stateKeys, stringKeyValue)
    }
    const stringLocalStorageValue = localStorage.getItem(stateKeys)
    const jsonLocalStorageValue = JSON.parse(stringLocalStorageValue)
    localStorageValues[stateKeys] = jsonLocalStorageValue
  })

  return localStorageValues
}

export const updateLocalStorageByState = (state) => {
  const stateKeys = Object.keys(state)
  stateKeys.forEach(stateKeys => {
    const json = JSON.stringify(state[stateKeys])
    localStorage.setItem(stateKeys, json)
  })
}
class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList,
      searchedName: '',
      searchedCategory: '',
      CategoryOptions: CategoryOptions,
    }
  }

  // toggle by id
  editTodo = (id, newTodo) => {
    const newList = this.state.toDoList.map(currentTodo => {
      if (currentTodo.id === id) {
        if (newTodo.name === "")
          newTodo.name = currentTodo.name
        return {
          ...currentTodo,
          ...newTodo
        }
      }

      return currentTodo
    })

    this.setState({ toDoList: newList })
  }

  addNewItem = (nameToAdd) => {
    let newToDo = { id: this.state.toDoList[this.state.toDoList.length - 1].id + 1, name: nameToAdd, isActive: false, Category: "Sports" }
    this.setState((prevState) => {
      return { toDoList: [...prevState.toDoList, newToDo] }
    })
  }

  updateSearchedName = (searchedName) => {
    this.setState({ searchedName: searchedName })
  }
  // 
  deleteToDo = (id) => {
    this.setState((prevState) => ({ toDoList: prevState.toDoList.filter(todo => todo.id !== id) }));
  }

  handleChangedCategory = (searchedCategory) => {
    this.setState({ searchedCategory })
  }



  componentDidMount() {
    const syncedState = syncStateAndLocalStorage(this.state)

    this.setState(syncedState)
  }

  componentDidUpdate(prevProps, prevStates) {
    updateLocalStorageByState(this.state)
  }

  render() {
    const filteredTodosByName = this.state.toDoList.filter(todo => todo.name.toLowerCase().includes(this.state.searchedName.toLowerCase()))
    const filteredTodosByNameAndCategory = filteredTodosByName.filter(todo => todo.Category.toLowerCase() === this.state.searchedCategory)
    const { handleChangedCategory, pickCategory, updateSearchedName, addNewItem, handleDeletePropragation, editTodo, deleteToDo } = this
    return (
      <div className="Page" >
        <h1 className="headerStyle">ToDoList</h1>
        <Filters CategoryOptions={this.state.CategoryOptions}
          handleChangedCategory={handleChangedCategory}
          // destructring state
          searchedName={this.state.searchedName}
          searchedCategory={this.state.searchedCategory} pickCategory={pickCategory} updateSearchedName={updateSearchedName} />
        <AddItem nameToAdd={this.state.nameToAdd}
          addNewItem={addNewItem} />
        <Todos Todos={filteredTodosByNameAndCategory}
          handleDeletePropragation={handleDeletePropragation}

          editTodo={editTodo}
          deleteToDo={deleteToDo} />
      </div>
    )
  }

}

export default MainList

