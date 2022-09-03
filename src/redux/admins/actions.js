import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_ADMINS,
  START_FETCHING_ADMINS,
  SUCCESS_FETCHING_ADMINS,
} from "./constants";

let debouncedFetchAdmin = debounce(getData, 1000);

export const startFetchingAdmin = () => {
  return {
    type: START_FETCHING_ADMINS,
  };
};

export const errorrFetchingAdmin = () => {
  return {
    type: ERROR_FETCHING_ADMINS,
  };
};

export const successFetchingAdmin = ({ admins }) => {
  return {
    type: SUCCESS_FETCHING_ADMINS,
    admins,
  };
};

const fetchAdmins = () => {
  return async (dispatch) => {
    dispatch(startFetchingAdmin());
    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchAdmin("/cms/users");

      let _temp = [];
      res.data.data.forEach((res) => {
        if (res.role === "admin") {
          _temp.push(res);
        }
      });

      dispatch(successFetchingAdmin({ admins: _temp }));
    } catch (error) {
      dispatch(errorrFetchingAdmin());
    }
  };
};

export default fetchAdmins;
