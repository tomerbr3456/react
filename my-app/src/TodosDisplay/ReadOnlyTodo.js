import React from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({

  "editButton": {
    "width": "30%",
    "color": "white",
    "textDecoration": "none",
    "fontSize": "16px"
  },
  "editButtonAndTodoNameContainer": {
    display: "flex",
    "height": "100%",
    "width": "100%",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "textAlign": "center"
  },
  "toDo": {
    "width": "50%",
    "fontSize": "30px"
  }
})


const ReadOnlyTodo = (props) => {
  const { handleEditButton, todo } = props
  const classes = useStyles()

  return (
    <div className={classes.editButtonAndTodoNameContainer}>
      <div className={classes.editButton} onClick={handleEditButton}>
        EditToDo
      </div>
      <div className={classes.toDo}>
        {todo.name}
      </div>
    </div>
  )
}



export default ReadOnlyTodo
