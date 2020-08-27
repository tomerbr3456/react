import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainList from './TodosDisplay/MainList';
import UpdateCategories from './Filters/UpdateCategories';
import * as serviceWorker from './serviceWorker';
import { ToDoListProvider } from './GeneralFiles/StateManagment'
import { CategoryOptionsProvider } from './GeneralFiles/StateManagment'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CategoryOptionsProvider>
        <ToDoListProvider>
          <Switch>
            <Route path="/UpdateCategories" component={UpdateCategories} />
            <Route path="/" exact component={MainList} />
          </Switch>
        </ToDoListProvider>
      </CategoryOptionsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
