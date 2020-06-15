import {combineReducers} from 'redux';
import searchReducer from './searchReducer';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

export default combineReducers({
    //contain all searchReducer states
    movies: searchReducer
});
