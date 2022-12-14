import {
  START_FETCHING_LISTS_CATEGORIES,
  SUCCESS_FETCHING_LISTS_CATEGORIES,
  ERROR_FETCHING_LISTS_CATEGORIES,
  START_FETCHING_LISTS_TALENTS,
  SUCCESS_FETCHING_LISTS_TALENTS,
  ERROR_FETCHING_LISTS_TALENTS,
  START_FETCHING_LISTS_EVENTS,
  SUCCESS_FETCHING_LISTS_EVENTS,
  ERROR_FETCHING_LISTS_EVENTS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

let status = [
  {
    value: true,
    label: "Enable",
    target: { value: true, name: "statusTicketCategories" },
  },
  {
    value: false,
    label: "Disable",
    target: { value: false, name: "statusTicketCategories" },
  },
];

const initialState = {
  categories: [],
  statusCategories: statuslist.idle,
  talents: [],
  statusTalents: statuslist.idle,
  events: [],
  statusEvents: statuslist.idle,
  status,
  statusTicket: statuslist.success,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // START ## LIST CATEGORIES ====================================
    case START_FETCHING_LISTS_CATEGORIES:
      return { ...state, statusCategories: statuslist.process };

    case ERROR_FETCHING_LISTS_CATEGORIES:
      return { ...state, statusCategories: statuslist.error };

    case SUCCESS_FETCHING_LISTS_CATEGORIES:
      return {
        ...state,
        statusCategories: statuslist.success,
        categories: action.categories,
      };
    // END ## LIST CATEGORIES ======================================

    // START #### LIST TALENTS =====================================
    case START_FETCHING_LISTS_TALENTS:
      return { ...state, statusTalents: statuslist.process };

    case ERROR_FETCHING_LISTS_TALENTS:
      return { ...state, statusTalents: statuslist.error };

    case SUCCESS_FETCHING_LISTS_TALENTS:
      return {
        ...state,
        statusTalents: statuslist.success,
        talents: action.talents,
      };
    // END ## LIST TALENTS ========================================

    // START #### LIST EVENTS =====================================
    case START_FETCHING_LISTS_EVENTS:
      return { ...state, statusEvents: statuslist.process };

    case ERROR_FETCHING_LISTS_EVENTS:
      return { ...state, statusEvents: statuslist.error };

    case SUCCESS_FETCHING_LISTS_EVENTS:
      return {
        ...state,
        statusEvents: statuslist.success,
        events: action.events,
      };
    // END ## LIST EVENTS =========================================

    default:
      return state;
  }
}
