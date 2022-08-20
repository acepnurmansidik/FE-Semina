import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_ORDERS,
  SET_DATE,
  SET_PAGE,
  START_FETCHING_ORDERS,
  SUCCESS_FETCHING_ORDERS,
} from "./constants";
import moment from "moment";
import debounce from "debounce-promise";

let debouncedFetchOrders = debounce(getData, 1000);

export const startFetchingOrders = () => {
  return {
    type: START_FETCHING_ORDERS,
  };
};

export const errorFethingOrders = () => {
  return {
    type: ERROR_FETCHING_ORDERS,
  };
};

export const successFetchingOrders = ({ orders, page }) => {
  return {
    type: SUCCESS_FETCHING_ORDERS,
    orders,
    page,
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        page: getState().orders?.page || 1,
        limit: getState().orders?.limit || 10,
        startDate: moment(getState().orders?.date?.startDate).format(
          "YYYY-MM-DD"
        ),
        endDate: moment(getState().orders?.date?.endDate).format("YYYY-MM-DD"),
      };

      let res = await debouncedFetchOrders("/cms/orders", params);

      const _temp = [];
      res.data.data.order.forEach((res) => {
        _temp.push({
          name: `${res.personalDetail.firstName} ${res.personalDetail.lastName}`,
          email: res.personalDetail.email,
          title: res.historyEvent.title,
          date: res.historyEvent.date,
          orderDate: moment(res.date).format("DD-MM-YYYY, h:mm:ss a"),
          venueName: res.historyEvent.venueName,
        });
      });

      dispatch(
        successFetchingOrders({
          orders: _temp,
          pages: res.data.data.page,
        })
      );
    } catch (err) {
      dispatch(errorFethingOrders());
    }
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

export const setDate = (ranges) => {
  return {
    type: SET_DATE,
    ranges,
  };
};
