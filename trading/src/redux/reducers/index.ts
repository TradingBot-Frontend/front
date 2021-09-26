import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import authReducer from './authReducer';
import portfolioReducer from './portfolioReducer';
import livePrices from './LivePrices';

const createRootReducer = (history: History): Reducer =>
  // 여기에 reducer 추가하면 됩니다!
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    portfolio: portfolioReducer,
    live: livePrices,
  });

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
