import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Todo from './Todo'
import { createUseStyles } from 'react-jss'

const TodosStyle = createUseStyles({
  listContainer: {
    display: 'flex',
    direction: 'row',
    wrap: 'nowrap',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: ' center',
  },
  editCategories: {
    width: '10%',
    fontSize: '20px',
    backgroundColor: 'dodgerblue'
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
    overflowX: 'hidden'
  }
})

const Todos = (props) => {
  const {
    toggleActive, deleteToDo, updateTodo, TodosList,
  } = props
  // 
  Todos.propTypes = {
    toggleActive: PropTypes.func.isRequired,
    updateTodo: PropTypes.number.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    TodosList: PropTypes.func.isRequired,
  }
  const classes = TodosStyle()

  return (
    <div className={classes.listContainer}>
      <Link to="/Categories" className={classes.editCategories}>Edit Categories</Link>
      <div className={classes.listOfToDos}>
        {TodosList.map((todo, index) => (
          <Todo
            key={todo.id}
            updateTodo={updateTodo}
            todo={todo}
            index={index}
            deleteToDo={deleteToDo}
            toggleActive={toggleActive}
          />
        ))}
      </div>
      <div className={classes.takePlace} />

    </div>

  )
}

export default Todos