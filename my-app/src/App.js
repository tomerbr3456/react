import React from 'react';
import logo from './logo.svg';
import './App.css';

var newchange=""
var classActive = "isActiveButton Active"
var classNotActive = "isActiveButton"
class MainList extends React.Component {

    constructor(props) {
        const toDoList = [{ id: 1, name: "GUY", isActive: true }, { id: 66777, name: "GUY2", isActive: true }, { id: 2, name: "GUY3", isActive: false }]
        super(props);
        this.state = {
            toDoList,
            value: '',
        }
        this.changeActive = this.changeActive.bind(this);
        this.updateToDoName = this.updateToDoName.bind(this);
        this.addNewToDo = this.addNewToDo.bind(this);
        this.render = this.render.bind(this);
    }
    isActive(index) {
        if (this.state.toDoList[index].isActive == true) {
            return classActive
        }
        return classNotActive
    }


    changeActive(index) {

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
        if (this.state.value != "") {
            let newToDo = { id: this.state.toDoList.length, name: this.state.value, isActive: false }
            let lastArray = []
            lastArray.push(newToDo)
            let submitted = "added"
            this.updateToDoName(event, submitted)
            // 
            this.setState({
                toDoList: [...this.state.toDoList, ...lastArray]
            })
        }

    }


    updateToDoName(event, submitted) {
        if (submitted == "added")
            this.setState({ value: "" });
        else
            this.setState({ value: event.target.value });
    }
    deleteToDo(index) {
        let deletedArr = this.state.toDoList.slice(0, this.state.toDoList.length)
        deletedArr.splice(index, 1)
        this.setState({ toDoList: deletedArr });
    }
    componentDidMount() {
        const json = localStorage.getItem('toDoList')
        const toDoList = JSON.parse(json)
        this.setState(() => ({ toDoList }))
    }
    componentDidUpdate(prevProps, prevStates) {
        const json = JSON.stringify(this.state.toDoList)
        localStorage.setItem('toDoList', json)
    }

    render() {
        return (
            <div className="Page">
                <h1 className="headerStyle">ToDoList</h1>
                <div className="toDoManager">
                    <div className="newToDo" >

                        <label>
                            <input className="input" type="text" value={this.state.value} onChange={this.updateToDoName} />
                        </label>

                    </div>
                    <div className="addTask" > <input className="addToDo" value="Add" onClick={this.addNewToDo} /></div>
                </div>

                <div className="listStyle">
                    {this.state.toDoList.map((name, index) =>
                        <div className="buttonsFather">
                            <button id="buttonActive" key={index.toString()} className={this.isActive(index)} onClick={() => this.changeActive(index)}>
                                <div className="toDo" >{name.name}</div>

                            </button>
                            <button id="buttonDelete" className="deleteItem buttonDelete" onClick={() => this.deleteToDo(index)}>press to delete</button>
                        </div>
                    )

                    }
                </div>

            </div>
        )
    }

}
export default MainList
