import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// CREATE MESSAGE (POSITIVE)
export const createMessage = (message) => {
  return {
    type: CREATE_MESSAGE,
    payload: message,
  };
};

// RETURN ERRORS (NEGATIVE MESSAGE)
export const returnErrors = (message, status) => {
  return {
    type: GET_ERRORS,
    payload: { message, status },
  };
};
