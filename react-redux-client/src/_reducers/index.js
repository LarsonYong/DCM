/*
 src/_reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { nodes } from './nodes.reducer';


const rootReducer = combineReducers({
  authentication,
  users,
  nodes
});

export default rootReducer;
