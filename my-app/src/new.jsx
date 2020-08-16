import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>ToDoList</h1>
        </div>
    );
}




class MainList extends React.Component {

    constructor(props) {
        const classActive = "isActiveButton"
        const toDoList = [{ id: 1, name: "GUY", isActive: true }, { id: 66777, name: "GUY2", isActive: false }, { id: 2, name: "GUY3", isActive: false }]
        super(props);
        this.state = {
            toDoList,
            classActive,
            value: '',
        }
        this.isActive = this.isActive.bind(this);
        this.updateToDoName = this.updateToDoName.bind(this);
        this.addNewToDo = this.addNewToDo.bind(this);
    }

    isActive(id) {

        if (this.state.toDoList[id].isActive == true) {
            // 
            this.state.classActive = "isActiveButton Active"

            this.setState((state) => {
                return { isActive: false }
            });
        }
        else {
            // 
            this.state.classActive = "isActiveButton"
            this.setState((state) => {
                return { isActive: true }
            });
        }
    }
    addNewToDo(event) {
        debugger
        let newToDo = { id: this.state.toDoList.length, name: this.state.value, isActive: false }
        let lastArray = []
        lastArray.push(newToDo)
        debugger
        // 
        this.setState({
            toDoList: [...this.state.toDoList, ...lastArray]
        })

    }


    updateToDoName(event) {
        this.setState({ value: event.target.value });
    }
    deleteToDo() {
        let deletedArr = this.state.toDoList.slice(1, this.state.toDoList.length)
        this.setState({ toDoList: deletedArr });
    }
    render() {
        return (
            <div className="Page">
                <h1 className="headerStyle">ToDoList</h1>
                <div className="makeItFlex">
                    <button className="deleteItem overt" onClick={() => this.deleteToDo()}>press to delete</button>
                </div>
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
                        <button key={index.toString()} className={this.state.classActive} onClick={() => this.isActive(index)}>
                            <div className="toDo" >{name.name}</div>
                        </button>
                    )

                    }
                </div>

            </div>
        )
    }

}
//export default App;
export default MainList
