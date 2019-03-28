import {combineReducers} from 'redux'
import books from './books'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({form: formReducer, books})