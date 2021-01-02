import React from 'react';

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Admin from './components/Admin'

////REDUX
//import { useSelector,useDispatch } from 'react-redux'
//import {increment} from './actions/index'//setting the type for reducer

function App() {

//    const counter = useSelector(state => state.counter);
//    const dispatch = useDispatch();

  return (
    <div>
    <Admin />



{/*
    <button onClick={()=> dispatch(increment())} >+</button>
      <h1>Counter {counter}</h1>
*/}

    </div>
  );
}

export default App;
