import React from 'react';
const Todos = (props) => {
  return (
    <div className="listContainer">
      <div className="listOfToDos">
        {props.filterByNameAndCategory.map((todo, index) =>
          <button id="buttonActive" key={index.toString()} className={props.changeActiveClass(index)} onClick={() => props.toggleActive(index)}>
            <div id="buttonDelete" className="deleteItem buttonDelete" onClick={function (e) { props.handleDeletePropragation(e); props.deleteToDo(todo.id) }}>press to delete</div>
            <div className="toDo" >{todo.name}</div>

          </button>
        )

        }
      </div>

    </div>

  )
}
export default Todos