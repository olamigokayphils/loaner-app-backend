import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../common/Header";
import { loginUser } from "../../authentication/action";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [displaySpinner, setDisplaySpinner] = useState(false);

  const onValueChange = (fieldName, value) => {
    if (fieldName === "userEmail") {
      setUserEmail(value);
    } else if (fieldName === "userPassword") {
      setUserPassword(value);
    }
  };
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errors);
  const auth = useSelector((state) => state.authentication);

  useEffect(() => {
    setDisplaySpinner(false);
  }, [error]);

  const proceedToLogin = () => {
    setDisplaySpinner(true);
    dispatch(loginUser(userEmail, userPassword));
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <Fragment>
        <Header />
        <div className="container mt-5">
          <div className="col-sm-6 offset-3 card card-body shadow">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                proceedToLogin();
              }}
            >
              <h3 className="text-center">Login</h3>
              <div className="form-group">
                <label>Email</label>
                <input required onChange={(event) => onValueChange("userEmail", event.target.value)} type="email" placeholder="Enter email address" className="form-control" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input required onChange={(event) => onValueChange("userPassword", event.target.value)} type="password" placeholder="Enter Password" className="form-control" />
              </div>
              <div className="form-group text-center">
                <button hidden={displaySpinner} className="btn btn-success btn-block" type="submit">
                  Login
                </button>
                {/** SPINNER */}
                <div hidden={!displaySpinner} class="spinner-border mt-3 text-success" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                {/** END SPINNER */}
              </div>

              <p className="text-center">
                Forgot Password? <a href="#">Click here</a>
              </p>
              <p className="text-center">Copyright (c) Tech Bridge MATC Cohort 20'G1</p>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
