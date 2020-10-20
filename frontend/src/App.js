import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";
import PrivateRoute from "./layout/common/PrivateRoute";
import Login from "./layout/auth/Login";
import Signup from "./layout/auth/Signup";
import Main from "./Main";
import { loadUser } from "./authentication/action";
import { Provider as AlertProvider, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // COMPONENT DID MOUNT
    dispatch(loadUser());
  });

  // ALERT OPTIONS
  const alertOptions = {
    timeout: 3000,
    position: positions.TOP_RIGHT,
  };

  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Router>
        <Fragment>
          <Switch>
            <PrivateRoute exact path="/" component={Main} />
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/register" component={Signup} />
          </Switch>
        </Fragment>
      </Router>
    </AlertProvider>
  );
}

App.propTypes = {
  loadUser: PropTypes.func,
};

export default App;
