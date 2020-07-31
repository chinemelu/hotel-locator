import axios from "axios";

const source = axios.CancelToken.source();
const axiosInstance = axios.create();

class AxiosCalls {
  async get(url: string) {
    try {
    let response: null | object = null;

    setTimeout(() => {
      if (response === null) {
          source.cancel('Timeout');
      }
    }, 10000);
      response = await axiosInstance.get(url, { cancelToken: source.token });
      const responseObject = {
        success: true,
        response: response
      }
      return responseObject;
    } catch (errorResponse) {
      if (errorResponse.response as string) {
        errorResponse = errorResponse.response;
      } else if (errorResponse.request as string) {
        errorResponse = errorResponse.request;
      } else {
        errorResponse = errorResponse.message as string;
      }
      const errorObject = {
        success: false,
        error: errorResponse
      }
      return errorObject;
    }
  }
}

const axiosCalls = new AxiosCalls();

export default axiosCalls;
