import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//React Redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';//it connects our global store to our entire app
import allReducers from './reducers/index';

//in allReducers we have both combined counter and isLogged reducers
const myStore = createStore(allReducers,
                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                         );

ReactDOM.render(
  <React.StrictMode>
  <Provider store={myStore}>
    <App />
  </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
