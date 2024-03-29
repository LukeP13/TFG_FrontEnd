import { LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  isLoggedIn: false,
  userId: "",
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
