import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import authReducer from './authReducer';
import botReducer from './botReducer';

const createRootReducer = (history: History): Reducer =>
  // 여기에 reducer 추가하면 됩니다!
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    bot: botReducer,
  });

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
