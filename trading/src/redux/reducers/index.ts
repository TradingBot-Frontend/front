import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import authReducer from './authReducer';

const createRootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });

export default createRootReducer;
