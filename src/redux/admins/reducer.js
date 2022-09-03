import {
  ERROR_FETCHING_ADMINS,
  START_FETCHING_ADMINS,
  SUCCESS_FETCHING_ADMINS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_ADMINS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ADMINS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_ADMINS:
      return { ...state, status: statuslist.success, data: action.admins };

    default:
      return state;
  }
};

export default reducer;
