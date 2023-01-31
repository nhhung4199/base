import {combineReducers} from 'redux';
import userReducer from './userReducer/reducer';
const res = combineReducers({
  userReducer,
});

export default res;
