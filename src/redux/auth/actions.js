import { USER_LOGIN, USER_LOGGOUT } from "./constants";

export const userLogin = (token, role) => {
  return {
    type: USER_LOGIN,
    token,
    role,
  };
};

export const userLoggout = () => {
  localStorage.removeItem("auth");

  return {
    type: USER_LOGGOUT,
  };
};
