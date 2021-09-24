import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from '@redux/store';
import './App.css';
import MainRouter from '@routes/MainRouter';
import login from '@utils/login';
import { useHistory } from 'react-router';

function App(): JSX.Element {
  const h = useHistory();

  useEffect(() => {
    if (login()) {
      h.push('/main');
    }
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MainRouter />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
