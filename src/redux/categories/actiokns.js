import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
} from "./constants";
import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";

let debouncedFetchCategories = debounce(getData, 1000);

// Start fetching data from server
const startFetchingCategories = () => {
  return {
    type: START_FETCHING_CATEGORIES,
  };
};

const successFetchingCategories = () => {
  return {
    type: SUCCESS_FETCHING_CATEGORIES,
  };
};

const errorFetchingCategories = () => {
  return {
    type: ERROR_FETCHING_CATEGORIES,
  };
};

const fetchCategories = () => {
  return async (dispatch) => {
    // akan melakukan loading terlebih dahulu di redux
    dispatch(startFetchingCategories());

    try {
      // jeda waktu untuk delete notifikasi
      // setTimeout(() => {
      //     dispatch(clearNotif())
      // }, 3000);

      // get data categories/hit API categories
      let response = debouncedFetchCategories("/cms/categories");

      // masukan ke dalam redux jika ada perubahan data
      dispatch(
        successFetchingCategories({
          categories: response.data.data,
        })
      );
    } catch (err) {
      dispatch(errorFetchingCategories());
    }
  };
};
