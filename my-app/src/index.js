import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainList from './TodosDisplay/MainList';
import Categories from './Categories/CategoriesContainer';
import * as serviceWorker from './serviceWorker';
import { CategoryProvider } from './StateManagment/CategoriesState'
import { ToDoListProvider } from './StateManagment/TodoListState'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CategoryProvider>
        <ToDoListProvider>
          <Switch>
            <Route path="/Categories" component={Categories} />
            <Route path="/" exact component={MainList} />
          </Switch>
        </ToDoListProvider>
      </CategoryProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
