import {
  ERROR_FETCHING_TALENTS,
  SET_KEYWORD,
  START_FETCHING_TALENTS,
  SUCCESS_FETCHING_TALENTS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  status: statuslist.idle,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_TALENTS:
      return { ...state, status: statuslist.idle };

    case SUCCESS_FETCHING_TALENTS:
      return { ...state, status: statuslist.success, data: action.talents };

    case SET_KEYWORD:
      return { ...state, keyword: action.keyword };

    case ERROR_FETCHING_TALENTS:
      return { ...state, status: statuslist.error };

    default:
      return state;
  }
};

export default reducer;
