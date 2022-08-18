import {
  ERROR_FETCHING_PAYMENTS,
  START_FETCHING_PAYMENTS,
  SUCCESS_FETCHING_PAYMENTS,
} from "./constants";

const statuslist = {
  idle: "idele",
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
    case START_FETCHING_PAYMENTS:
      return { ...state, status: statuslist.process };

    case SUCCESS_FETCHING_PAYMENTS:
      return { ...state, status: statuslist.success, data: action.payments };

    case ERROR_FETCHING_PAYMENTS:
      return { ...state, status: statuslist.error };

    default:
      return state;
  }
};

export default reducer;
