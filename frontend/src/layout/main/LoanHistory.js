import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { requestNewLoan, getUserDashboard } from "../../dashboard/action";

const Lodar = require("../../assets/126.gif");

export default function LoanHistory() {
  const dispatch = useDispatch();
  const [userLoanHistory, setLoanHistory] = useState([]);
  const [displaySpinner, setDisplaySpinner] = useState(true);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanAmountError, setLoanAmountError] = useState("");
  const [displayRequestSpinner, setDisplayRequestSpinner] = useState(false);
  const [requestLoanModalOpen, setRequestLoanModalOpen] = useState(false);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const dashboard = useSelector((state) => state.dashboard.userDashboard);
  const prevDashBoard = usePrevious(dashboard);

  const requestLoanResponse = useSelector((state) => state.dashboard.loanRequest);
  const prevRequestLoanResponse = usePrevious(requestLoanResponse);

  useEffect(() => {
    if (prevDashBoard) {
      if (prevDashBoard !== dashboard) {
        setDisplaySpinner(false);
        setLoanHistory(dashboard.loans);
      }
    }

    if (prevRequestLoanResponse) {
      if (prevRequestLoanResponse.length !== requestLoanResponse.length) {
        if (requestLoanResponse[requestLoanResponse.length - 1]["status"] === "success") {
          // CLOSE REQUEST LOAN MODAL
          setRequestLoanModalOpen(false);
          setDisplayRequestSpinner(false);
          // DIPATCH "GET DASHBOARD DATA"
          //Set display spinner to true
          setDisplaySpinner(true);
          // get Dashboard data
          dispatch(getUserDashboard());
        } else if (requestLoanResponse[requestLoanResponse.length - 1]["status"] === "failed") {
          setDisplayRequestSpinner(false);
          setLoanAmountError(requestLoanResponse[requestLoanResponse.length - 1]["message"]);
        }
      }
    }
  });

  const closeRequestLoanModal = () => {
    //CLOSES THE MODAL
    setRequestLoanModalOpen(false);
    // RETURNS REQUEST SPINNER BACK TO DEFAULT
    setDisplayRequestSpinner(false);
    // CLEAR AMOUNT
    setLoanAmount("");
    // CLEAR ERRORS
    setLoanAmountError("");
  };

  const closeWithdrawalModal = () => {
    setWithdrawalModalOpen(false);
  };

  const userRequestsLoan = () => {
    if (loanAmount !== "" && !isNaN(loanAmount)) {
      if (Number(loanAmount) < 1000) {
        setLoanAmountError("Amount cannot be less than 1000");
      } else if (Number(loanAmount) > 50000) {
        setLoanAmountError("Amount cannot be greater than 50,000");
      } else {
        // Dispatch Action
        setDisplayRequestSpinner(true);
        dispatch(requestNewLoan(loanAmount));
      }
    } else {
      setLoanAmountError("Invalid Amount");
    }
  };

  const returnLoanBadge = (loanStatus) => {
    switch (loanStatus) {
      case "processing":
        return <span className="badge badge-primary text-capitalize">{loanStatus}</span>;
      case "running":
        return <span className="badge badge-warning text-capitalize">{loanStatus}</span>;
      case "defaulting":
        return <span className="badge badge-danger text-capitalize">{loanStatus}</span>;
      case "rejected":
        return <span className="badge badge-secondary text-capitalize">{loanStatus}</span>;
      case "paid":
        return <span className="badge badge-success text-capitalize">{loanStatus}</span>;
      default:
        return <span className="badge badge-primary text-capitalize">{loanStatus}</span>;
    }
  };

  const renderLoanHistory = () => {
    return (
      <div>
        {userLoanHistory.map((record, index) => {
          return (
            <div key={index} className="card card-body shadow mt-3">
              <div className="loan-history-card">
                <div style={{ textAlign: "initial" }}>
                  Request Date: {new Date(record.requestDate).toDateString()} <br />
                  Amount: ₦{`${record.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div>
                  Status: {returnLoanBadge(record.status)} <br />
                  Interest: 10%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderNoLoanHistory = () => {
    return (
      <div>
        <h5 className="font-weight-bold">You currently do not have any Loan History</h5>
      </div>
    );
  };
  return (
    <Fragment>
      <Modal show={requestLoanModalOpen} onHide={() => closeRequestLoanModal()}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Request New Loan</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4 style={{ color: "gray" }} className="text-center">
              Maximum Loan Amount <b>₦50,000</b>
            </h4>
            <br />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                userRequestsLoan();
              }}
            >
              <div className="form-group">
                <label>Loan Amount</label>
                <div className="mb-3">
                  <small className="text-danger">{loanAmountError}</small>
                </div>
                <input
                  placeholder="Enter request Amount"
                  value={loanAmount}
                  onChange={(event) => {
                    setLoanAmountError("");
                    setLoanAmount(event.target.value);
                  }}
                  className="form-control"
                  type="number"
                />
              </div>
              <div className="form-group text-center">
                <button hidden={displayRequestSpinner} className="btn btn-success btn-block">
                  Submit
                </button>
                {/** SPINNER */}
                <div hidden={!displayRequestSpinner} class="spinner-border mt-3 text-success" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                {/** END SPINNER */}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={withdrawalModalOpen} onHide={() => closeWithdrawalModal()}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Withdraw Funds</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <div className="form-group">
                <label>Amount</label>
                <input placeholder="Enter Amount" className="form-control" type="number" />
              </div>
              <div className="form-group">
                <label>VetroPay UID</label>
                <input placeholder="Enter VetroPay UID" className="form-control" type="number" />
              </div>
              <div className="form-group">
                <button className="btn btn-success btn-block">Withdraw</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <div className="container">
        <div className="text-center">
          <button onClick={() => setRequestLoanModalOpen(true)} className="btn btn-success">
            Request New Loan
          </button>
          <button onClick={() => setWithdrawalModalOpen(true)} className="btn btn-secondary ml-2">
            Withdraw Funds
          </button>
        </div>
        <br />
        Loan History:
        {displaySpinner && (
          <div className="text-center">
            <img alt="Loading" src={Lodar} />
          </div>
        )}
        {!displaySpinner && <div className="text-center mt-5">{userLoanHistory.length > 0 ? renderLoanHistory() : renderNoLoanHistory()}</div>}
      </div>
    </Fragment>
  );
}
