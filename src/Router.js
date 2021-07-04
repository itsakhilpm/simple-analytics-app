import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { storage } from './helpers/utils';
import { useSelector } from 'react-redux';
import SignInForm from './Components/Auth/SignInForm';
import Dashboard  from './Components/Dashboard';

function Router(){
    return(
        <Switch>
            <Route exact path="/login" component={SignInForm} />
            <PrivateRoute exact patch="/" component = {Dashboard} />
        </Switch>
    )
}
const PrivateRoute = ({ component: Component, ...rest }) => {
    const userAuthenticated = useSelector((state) => state.user.userAuthenticated)
    const userToken = storage.get("authToken", "local");
    return (
      <Route
        {...rest}
        render={(props) =>
          userToken || userAuthenticated ? (
            // true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  };
export default Router