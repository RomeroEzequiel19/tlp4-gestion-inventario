import { Auth } from "../types/type";

export const authReducer = (state, action) => {
  switch (action.type) {
    case Auth.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case Auth.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};
