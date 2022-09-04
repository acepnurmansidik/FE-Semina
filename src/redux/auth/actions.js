import { USER_LOGIN, USER_LOGGOUT } from "./constants";

export const userLogin = (token, role, email, refreshToken) => {
  return {
    type: USER_LOGIN,
    role,
    email,
    token,
    refreshToken,
  };
};

export const userLoggout = () => {
  localStorage.removeItem("auth");

  return {
    type: USER_LOGGOUT,
  };
};
