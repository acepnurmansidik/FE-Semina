import {
  ERROR_FETCHING_ORGANIZERS,
  START_FETCHING_ORGANIZERS,
  SUCCCESS_FETCHING_ORGANIZERS,
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.error };

    case SUCCCESS_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.success, data: action.organizer };

    default:
      return state;
  }
}
