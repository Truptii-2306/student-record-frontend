import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.BASEURL,
});

axiosInstance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response >= 400 && error.response < 500;

  if (!expectedError) {
    toast.error(error.response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return Promise.reject(error);
});

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
