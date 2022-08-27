import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_ORGANIZERS,
  START_FETCHING_ORGANIZERS,
  SUCCCESS_FETCHING_ORGANIZERS,
} from "./constants";

let debouncedFetchOrganizer = debounce(getData, 1000);

export const startFetchingOrganizer = () => {
  return {
    type: START_FETCHING_ORGANIZERS,
  };
};

export const successFetchingOrganizer = ({ organizer }) => {
  return {
    type: SUCCCESS_FETCHING_ORGANIZERS,
    organizer,
  };
};

export const errorFetchingOrganizer = () => {
  return {
    type: ERROR_FETCHING_ORGANIZERS,
  };
};

export const fetchOrganizers = () => {
  return async (dispatch) => {
    startFetchingOrganizer();
    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        role: "organizer",
      };

      let res = await debouncedFetchOrganizer("/cms/users", params);

      dispatch(
        successFetchingOrganizer({
          organizer: res.data.data,
        })
      );

      dispatch(successFetchingOrganizer());
    } catch (error) {
      dispatch(errorFetchingOrganizer());
    }
  };
};
