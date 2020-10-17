import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Alerts from "./Alerts";
import { logoutUser } from "../../authentication/action";

export default function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);

  const renderAuthenticatedNav = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container">
          <a style={{ fontWeight: "700", fontSize: "25px" }} className="navbar-brand" href="#">
            Loaner
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Request loan <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Transaction
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={() => dispatch(logoutUser())}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  };

  const renderNonAuthenticatedNav = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container">
          <a style={{ fontWeight: "700", fontSize: "25px" }} className="navbar-brand" href="#">
            Loaner
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  About us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Resources
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <Link className="btn btn-outline-primary my-2 my-sm-0" to="/auth/login">
                Login
              </Link>
              <Link className="btn btn-outline-primary my-2 ml-2 my-sm-0" to="/auth/register">
                Sign Up
              </Link>
            </form>
          </div>
        </div>
      </nav>
    );
  };
  return (
    <Fragment>
      <Alerts />
      <div>{auth.isAuthenticated ? renderAuthenticatedNav() : renderNonAuthenticatedNav()}</div>
    </Fragment>
  );
}

Header.propTypes = {
  logoutUser: PropTypes.func,
};
