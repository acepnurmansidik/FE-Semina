import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
} from "./constants";

let statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};
// hal pertama applikasi akan menampilkan data kosong dengan idle pada status
let initialState = {
  data: [],
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_CATEGORIES:
      return { ...state, status: statuslist.process };
    case SUCCESS_FETCHING_CATEGORIES:
      return { ...state, status: statuslist.success, data: action.categories };
    case ERROR_FETCHING_CATEGORIES:
      return { ...state, status: statuslist.error };
    default:
      return state;
  }
}
