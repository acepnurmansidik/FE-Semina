import { USER_LOGIN, USER_LOGGOUT } from "./constants";

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { role: null, email: null, token: null, refreshToken: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        token: action.token,
        role: action.role,
        refreshToken: action.refreshToken,
        email: action.email,
      };

    case USER_LOGGOUT:
      return {
        role: null,
        email: null,
        token: null,
        refreshToken: null,
      };

    default:
      return state;
  }
};

export default reducer;
