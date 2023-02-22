import {combineReducers} from 'redux';
import userReducer from './userReducer/reducer';
import resourceReducer from './resourceReducer/reducer';
const res = combineReducers({
  userReducer,
  resourceReducer,
});

export default res;
