import React from 'react';
import Dashboard from '@routes/normalRoute/Dashboard';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from '@redux/store';
import './App.css';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Dashboard />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
