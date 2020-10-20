import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDashboard } from "../../dashboard/action";

export default function User() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);
  const dashboard = useSelector((state) => state.dashboard.userDashboard);

  // COMPONENT DID MOUNT
  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getUserDashboard());
    }
  }, []);

  return (
    <div className="container mt-3">
      <div className="user-details">
        <h5>
          Welcome <b>{auth.user.fullname}</b>
        </h5>
        <h5>Balance: ₦{Number(dashboard.balance).toFixed(2)}</h5>
      </div>
      <hr />
    </div>
  );
}
