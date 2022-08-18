import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_PAYMENTS,
  START_FETCHING_PAYMENTS,
  SUCCESS_FETCHING_PAYMENTS,
} from "./constants";

let debouncedFetchPayments = debounce(getData, 1000);

export const startFetchingPayments = () => {
  return {
    type: START_FETCHING_PAYMENTS,
  };
};

export const successFetchPayments = ({ payments }) => {
  return {
    type: SUCCESS_FETCHING_PAYMENTS,
    payments,
  };
};

export const errorFetchPayments = () => {
  return {
    type: ERROR_FETCHING_PAYMENTS,
  };
};

export const fetchPayments = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingPayments());
    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let res = await debouncedFetchPayments("/cms/payments");

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(successFetchPayments({ payments: res.data.data }));
    } catch (err) {
      dispatch(errorFetchPayments());
    }
  };
};
