import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddlware from 'redux-saga';
import createRootReducer from '@redux/reducers';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddlware();
const middlewres = [sagaMiddleware, routerMiddleware(history)];
const initialState = {};
const store = createStore(createRootReducer(history), initialState, compose(applyMiddleware(...middlewres)));

export default store;
