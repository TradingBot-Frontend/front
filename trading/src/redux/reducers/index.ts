import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { History } from 'history';

const createRootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
  });

export default createRootReducer;