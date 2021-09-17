import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import CoinMarket from './normalRoute/CoinMarket';
import Dashboard from './normalRoute/Dashboard';
import Portfolio from './normalRoute/Portfolio';
import Simulation from './normalRoute/Simulation';
import TradingBot from './normalRoute/TradingBot';
import Main from './normalRoute/Main';

function MyRouter(): any {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/coin-market" exact component={CoinMarket} />
      <Route path="/trading-bot" exact component={TradingBot} />
      <Route path="/simulation" exact component={Simulation} />
      <Route path="/portfolio" exact component={Portfolio} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
export default MyRouter;
