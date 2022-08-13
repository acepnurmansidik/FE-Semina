import { USER_LOGIN, USER_LOGGOUT } from "./constants";

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { token: null, role: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        token: action.token,
        role: action.role,
      };

    case USER_LOGGOUT:
      return {
        token: null,
        role: null,
      };

    default:
      return state;
  }
};

export default reducer;
