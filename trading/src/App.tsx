import React from 'react';
import Dashboard from '@routes/normalRoute/Dashboard';
import { Provider, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from '@redux/store';
import './App.css';
import Login from '@routes/normalRoute/Login';
import { Redirect, Route, Switch } from 'react-router';
import { RootState } from '@redux/reducers';
import PrivateRoute from './routes/PrivateRoute';
import DashboardRoute from './routes/normalRoute/DashboardRoute';

function App(): JSX.Element {
  const rootState: RootState = store.getState();
  const { isAuthenticated } = rootState.auth;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/main" isAuthenticated={isAuthenticated}>
            <Dashboard />
          </PrivateRoute>
          {/* <Route path="/main">
            <Dashboard />
          </Route> */}
          <Redirect from="*" to="/login" />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
