import { combineReducers } from "redux";
import login from "../Containers/Login/reducer";

export const initialState = {
  otpData: [],
};

function reducer() {
  const rootReducer = combineReducers({
    login,
  });
  return rootReducer;
}

export default reducer;
