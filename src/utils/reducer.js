// import { combineReducers } from "redux";

export const initialState = {
  loginData: [],
  token: [],
  signupData: [],
  collegeList: [],
  canteenData: [],
  selectedCanteen: [],
  placeOrder: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return { ...state, loginData: action.data };
    case "token":
      return { ...state, token: action.data };
    case "signup":
      return { ...state, signupData: action.data };
    case "collegelist":
      return { ...state, collegeList: action.data };
    case "canteenData":
      return { ...state, canteenData: action.data };
    case "selectedCanteen":
      return { ...state, selectedCanteen: action.data };
    case "placeOrder":
      return { ...state, placeOrder: [...state.placeOrder, action.data] };
    case "clear":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
