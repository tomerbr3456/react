import React from 'react';
import PropTypes from 'prop-types'
import Todo from './Todo'
import { createUseStyles } from 'react-jss'

const TodosStyle = createUseStyles({
  listContainer: {
    display: 'flex',
    wrap: 'nowrap',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: ' center',
  },
  takePlace: {
    width: '10%'
  },
  listOfToDos: {
    'font-size': '30px',
    width: '49%',
    fontSize: '30px',
    maxHeight: '300px',
    overflowY: 'auto',
    overflowX: 'hidden',
  }
})

const Todos = (props) => {
  const {
    toggleActive, deleteToDo, updateTodo, TodosList, handleDelete
  } = props
  // 
  const classes = TodosStyle()

  return (
    <div className={classes.listContainer}>
      <div className={classes.listOfToDos}>
        {TodosList.map((todo, index) => (
          <Todo
            key={todo.id}
            updateTodo={updateTodo}
            todo={todo}
            index={index}
            deleteToDo={deleteToDo}
            toggleActive={toggleActive}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>

  )
}
Todos.propTypes = {
  toggleActive: PropTypes.func.isRequired,
  updateTodo: PropTypes.number.isRequired,
  deleteToDo: PropTypes.func.isRequired,
  TodosList: PropTypes.func.isRequired,
}

export default Todos