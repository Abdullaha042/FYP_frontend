import counterReducer from './counter';
import loggedReducer from './isLogged';
//here we will combine our reducers
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
})

export default allReducers;