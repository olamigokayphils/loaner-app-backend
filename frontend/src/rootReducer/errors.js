import { GET_ERRORS } from "../rootAction/types";

const intialState = {
  message: {},
  status: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
