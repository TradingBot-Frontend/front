import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router';

// interface PrivateRouteProps extends RouteProps {
//   isAuthenticated: boolean;
// }

// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: PrivateRouteProps) => {
//   if (!Component) return null;
//   console.log(isAuthenticated, 'isAuthenticated');
//   return <Route {...rest} render={(props) => (true ? <Component {...props} /> : <Redirect to="/login" />)} />;
// };

interface PrivateRouteProps extends RouteProps {
  component: any;
  isAuthenticated: boolean;
}

const PrivateRoute = ({ component: Component, isAuthenticated, location, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
};

export default PrivateRoute;
