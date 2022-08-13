import axios from "axios";
import { config } from "../configs";
import handleError from "./handleError";

export const getData = async (url, params) => {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.get(`${config.api_host_dev}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    handleError(err);
  }
};

export const postData = async (url, payload, formData) => {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.post(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    });
  } catch (err) {
    handleError(err);
  }
};

export const putData = async (url, payload) => {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.put(`${config.api_host_dev}${url}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    handleError(err);
  }
};

export const deleteData = async (url) => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.delete(`${config.api_host_dev}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};