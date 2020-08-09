import axios from "axios";

const source = axios.CancelToken.source();
const axiosInstance = axios.create();
/* eslint-disable  @typescript-eslint/no-explicit-any */

class AxiosCalls {
  async get(url: string) {
    try {
      let response: any = null;

      setTimeout(() => {
        if (response === null) {
          source.cancel("Timeout");
        }
      }, 10000);
      response = await axiosInstance.get(url, { cancelToken: source.token });
      const responseObject = {
        success: true,
        response
      };
      return responseObject;
    } catch (errorResponse) {
      let error = "";
      if (errorResponse.response as string) {
        error = errorResponse.response;
      } else if (errorResponse.request as string) {
        error = errorResponse.request;
      } else {
        error = errorResponse.message as string;
      }
      const errorObject = {
        success: false,
        error
      };
      return errorObject;
    }
  }
}

const axiosCalls = new AxiosCalls();

export default axiosCalls;
