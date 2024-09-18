import { Auth } from "../types/type";

export const authReducer = (state, action) => {
  switch (action.type) {
    case Auth.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.pyload.token,
      };
    case Auth.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
