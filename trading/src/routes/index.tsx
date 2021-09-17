import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CoinMarket from './normalRoute/CoinMarket';
import Dashboard from './normalRoute/Dashboard';
import Portfolio from './normalRoute/Portfolio';
import Simulation from './normalRoute/Simulation';
import TradingBot from './normalRoute/TradingBot';

function MyRouter(): any {
  return (
    <>
      <Route path="/" exact component={Dashboard} />
      <Route path="/coin-market" exact component={CoinMarket} />
      <Route path="/trading-bot" exact component={TradingBot} />
      <Route path="/simulation" exact component={Simulation} />
      <Route path="/portfolio" exact component={Portfolio} />
    </>
  );
}
export default MyRouter;
