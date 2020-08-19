import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddItem from './AddItem';
import Filters from './Filters';
import Todos from './Todos'
var classActive = "isActiveButton Active"
var classNotActive = "isActiveButton"
const toDoList = [{ id: 1, name: "GUY", isActive: true, Category: "Friends" }, { id: 66777, name: "GUY2", isActive: true, Category: "Sport" }, { id: 2, name: "GUY3", isActive: false, Category: "Study" }]
const CategoryOptions = ["sports", "friends", "study"];

class MainList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toDoList,
      nameToAdd: '',
      searchedName: '',
      searchedCategory: '',
      CategoryOptions: CategoryOptions,

    }
    this.toggleActive = this.toggleActive.bind(this);
    this.updateToDoName = this.updateToDoName.bind(this);
    this.updateSearchBar = this.updateSearchBar.bind(this);
    this.addNewToDo = this.addNewToDo.bind(this);
    this.changeActiveClass = this.changeActiveClass.bind(this);
    this.handleDeletePropragation = this.handleDeletePropragation.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  changeActiveClass(index) {
    if (this.state.toDoList[index].isActive == true) {
      return classActive
    }
    return classNotActive
  }

  toggleActive(index) {

    if (this.state.toDoList[index].isActive == true) {
      this.setState((state) => {
        const setToDoList = this.state.toDoList.slice();
        setToDoList[index].isActive = false;
        return { toDoList: setToDoList }
      });
    }
    else {
      this.setState((state) => {
        const setToDoList = this.state.toDoList.slice();
        setToDoList[index].isActive = true;
        return { toDoList: setToDoList }
      });
    }
  }

  addNewToDo(event) {
    if (this.state.nameToAdd != "") {
      let newToDo = { id: this.state.toDoList.length + 1, name: this.state.nameToAdd, isActive: false, Category: "Sports" }
      this.setState({
        toDoList: [...this.state.toDoList, newToDo],
        nameToAdd: ''
      })
    }

  }

  updateToDoName(event) {
    this.setState({ nameToAdd: event.target.value });
  }

  updateSearchBar(event) {
    this.setState({ searchedName: event.target.value })
  }

  deleteToDo(id) {
    let deletedArr = this.state.toDoList.filter(todo => todo.id != id)
    this.setState({ toDoList: deletedArr });
  }

  componentDidMount() {
    if (localStorage.getItem('toDoList') === null) {
      const json = JSON.stringify(this.state.toDoList)
      localStorage.setItem('toDoList', json)
    }
    const stringToDoList = localStorage.getItem('toDoList')
    const toDoList = JSON.parse(stringToDoList)
    this.setState(() => ({ toDoList }))

    if (localStorage.getItem('searchedName') === null) {
      const searchedNameJson = JSON.stringify(this.state.searchedName)
      localStorage.setItem('searchedName', searchedNameJson)
    }

    const stringSearchByBarName = localStorage.getItem('searchedName')
    const searchByBarName = JSON.parse(stringSearchByBarName)
    this.setState({ searchedName: searchByBarName })

    if (localStorage.getItem('searchedCategory') === null) {
      const searchedCategoryJson = JSON.stringify(this.state.searchedCategory)
      localStorage.setItem('searchedCategory', searchedCategoryJson)
    }

    const stringsearchedCategory = localStorage.getItem('searchedCategory')
    const searchedCategory = JSON.parse(stringsearchedCategory)
    this.setState({ searchedCategory: searchedCategory })
  }

  pickCategory = (event) => {
    this.setState({ searchedCategory: event.target.value })
  }

  componentDidUpdate(prevProps, prevStates) {
    const json = JSON.stringify(this.state.toDoList)
    localStorage.setItem('toDoList', json)
    const searchedNameJson = JSON.stringify(this.state.searchedName)
    localStorage.setItem('searchedName', searchedNameJson)
    const searchedCategoryJson = JSON.stringify(this.state.searchedCategory)
    localStorage.setItem('searchedCategory', searchedCategoryJson)
  }

  handleDeletePropragation(e) {
    e.stopPropagation();
  }

  render() {
    var filteredByName = this.state.toDoList.filter(todo => todo.name.toLowerCase().includes(this.state.searchedName.toLowerCase()))
    const filterByNameAndCategory = filteredByName.filter(todo => todo.Category.toLowerCase() == this.state.searchedCategory)
    return (
      <div className="Page">
        <h1 className="headerStyle">ToDoList</h1>
        <Filters CategoryOptions={this.state.CategoryOptions}
          searchedName={this.state.searchedName}
          searchedCategory={this.state.searchedCategory} pickCategory={this.pickCategory} updateSearchBar={this.updateSearchBar} />
        <AddItem nameToAdd={this.state.nameToAdd}


          updateToDoName={this.updateToDoName}
          addNewToDo={this.addNewToDo} />

        <Todos filterByNameAndCategory={filterByNameAndCategory}
          handleDeletePropragation={this.handleDeletePropragation}
          changeActiveClass={this.changeActiveClass}
          toggleActive={this.toggleActive}
          deleteToDo={this.deleteToDo} />
      </div>
    )
  }

}

export default MainList

