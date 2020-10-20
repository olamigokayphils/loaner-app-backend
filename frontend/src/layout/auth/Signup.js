import React, { Fragment, useState } from "react";
import Header from "../common/Header";

export default function Signup() {
  const [registrationStage, SetRegistrationStage] = useState(1);

  const renderRegistrationStage = () => {
    switch (registrationStage) {
      case 1:
        return (
          <form>
            <h3 className="text-center">Signup</h3>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="Enter Phone Number" className="form-control" />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Full Name" className="form-control" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter Password" className="form-control" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="re-Enter Password" className="form-control" />
            </div>

            <div className="form-group">
              <button onClick={() => SetRegistrationStage(2)} className="btn btn-success btn-block" type="submit">
                Next
              </button>
            </div>

            <p className="text-center">
              Already registered? <a href="#">Sign in</a>
            </p>
            <p className="text-center">Copyright (c) Tech Bridge MATC Cohort 20'G1</p>
          </form>
        );
      case 2:
        return (
          <form>
            <h3 className="text-center">Signup</h3>
            <div className="form-group">
              <label>D.O.B</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group">
              <label>State of Residence</label>
              <select className="form-control">
                <option>--Select State--</option>
                <option>Lagos</option>
                <option>Ogun</option>
                <option>Enugu</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter valid mail address" className="form-control" />
            </div>

            <div className="form-group text-center">
              <button onClick={() => SetRegistrationStage(1)} className="btn btn-success btn-sm" type="submit">
                {"<<"}Previous
              </button>
              <button className="btn btn-success btn-sm ml-2" type="submit">
                Create Account
              </button>
            </div>
            <p className="text-center">Copyright (c) Tech Bridge MATC Cohort 20'G1</p>
          </form>
        );
          default:
            return null
      }
  };

  return (
    <Fragment>
      <Header />
      <div className="container mt-5">
        <div className="col-sm-6 offset-3 card card-body shadow">{renderRegistrationStage()}</div>
      </div>
    </Fragment>
  );
}
