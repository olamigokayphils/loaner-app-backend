import React, { Fragment } from "react";
import Header from "./layout/common/Header";
import User from "./layout/main/User";
import LoanHistory from "./layout/main/LoanHistory";

export default function Main() {
  return (
    <Fragment>
      <Header />
      <User />
      <LoanHistory />
    </Fragment>
  );
}
