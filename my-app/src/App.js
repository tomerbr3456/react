import React from 'react';
import logo from './logo.svg';
import './App.css';
var classActive = "isActiveButton Active"
var classNotActive = "isActiveButton"
const filterArray = [{}]
const toDoList = [{ id: 1, name: "GUY", isActive: true }, { id: 66777, name: "GUY2", isActive: true }, { id: 2, name: "GUY3", isActive: false }]

class MainList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toDoList,
            toDoName: '',
            searchBar: '',
        }

        this.toggleActive = this.toggleActive.bind(this);
        this.updateToDoName = this.updateToDoName.bind(this);
        this.updateSearchBar = this.updateSearchBar.bind(this);
        this.addNewToDo = this.addNewToDo.bind(this);
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
        // ma ze value? rename
        if (this.state.toDoName != "") {
            let newToDo = { id: this.state.toDoList.length + 1, name: this.state.toDoName, isActive: false }
            this.setState({
                toDoList: [...this.state.toDoList, newToDo],
                toDoName: ''
            })
        }

    }


    updateToDoName(event) {

        this.setState({ toDoName: event.target.value });
    }

    updateSearchBar(event) {
        this.setState({ searchBar: event.target.value })
    }

    deleteToDo(id) {
        let deletedArr = this.state.toDoList.filter(todo => todo.id != id)
        this.setState({ toDoList: deletedArr });
    }

    componentDidMount() {
        const stringToDoList = localStorage.getItem('toDoList')
        const toDoList = JSON.parse(stringToDoList)
        this.setState(() => ({ toDoList }))
    }

    componentDidUpdate(prevProps, prevStates) {
        const json = JSON.stringify(this.state.toDoList)
        localStorage.setItem('toDoList', json)
    }

    render() {
        const filterArray = this.state.toDoList.filter(todo => todo.name.toLowerCase().includes(this.state.searchBar.toLowerCase()))
        return (
            <div className="Page">
                <h1 className="headerStyle">ToDoList</h1>
                <label className="searchBarContainer">
                    <input className="searchBar" type="text" value={this.state.searchBar} onChange={this.updateSearchBar} placeholder="search for name!" />
                </label>
                <div className="toDoManager">
                    <div className="newToDo" >

                        <label>
                            <input className="input" type="text" value={this.state.toDoName} onChange={this.updateToDoName} />
                        </label>

                    </div>
                    <div className="addTask" > <input className="addToDo" value="Add" onClick={this.addNewToDo} /></div>
                </div>

                <div className="listStyle">

                    {filterArray.map((todo, index) =>
                        <button id="buttonActive" key={index.toString()} className={this.changeActiveClass(index)} onClick={() => this.toggleActive(index)}>
                            <div id="buttonDelete" className="deleteItem buttonDelete" onClick={(e) => { e.stopPropagation(); this.deleteToDo(todo.id) }}>press to delete</div>
                            <div className="toDo" >{todo.name}</div>

                        </button>
                    )

                    }
                </div>

            </div>
        )
    }

}
export default MainList
