import React, { useEffect, Fragment } from "react";
import { withAlert } from "react-alert";
import { useSelector } from "react-redux";

function Alerts({ alert }) {
  const error = useSelector((state) => state.errors);

  useEffect(() => {
    if (error) {
      if (error.message) {
        if (typeof error.message == "object") {
          if (Object.keys(error.message).length > 0) {
            alert.error(`${error.message.message}`);
          }
        } else {
          alert.error(`${error.message}`);
        }
      }
    }
  }, [error]);

  return <Fragment></Fragment>;
}

export default withAlert()(Alerts);
