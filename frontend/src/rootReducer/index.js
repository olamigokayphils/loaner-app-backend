import { combineReducers } from "redux";
import authentication from "../authentication/reducer";
import messages from "./messages";
import errors from "./errors";
import dashboard from "../dashboard/reducer";

export default combineReducers({
  authentication,
  messages,
  errors,
  dashboard,
});
