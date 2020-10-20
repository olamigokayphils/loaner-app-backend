import { GET_DASHBOARD, REQUEST_LOAN } from "../rootAction/types";

const initialState = {
  userDashboard: [],
  loanRequest: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        userDashboard: action.payload,
      };
    case REQUEST_LOAN:
      return {
        ...state,
        loanRequest: [...state.loanRequest, action.payload],
      };
    default:
      return state;
  }
}
