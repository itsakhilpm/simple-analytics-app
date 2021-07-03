import { combineReducers } from 'redux';
import user from './user';
import dashboard from './dashboard';
const root = combineReducers({ user, dashboard });

export default root;
