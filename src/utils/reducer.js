// import { combineReducers } from "redux";
import login from "../Containers/Login/reducer";

export const initialState = {
  loginData: [],
  signupData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return { ...state, loginData: action.data };
    case "signup":
      return { ...state, signupData: action.data };
    default:
      return state;
  }
};

export default reducer;
