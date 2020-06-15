import axios from "axios";

const axiosInstance = axios.create();

class AxiosCalls {
  async get(url: string) {
    try {
      const response = await axiosInstance.get(url);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    }
  }
}

const axiosCalls = new AxiosCalls();

export default axiosCalls;
