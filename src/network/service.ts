import type {AxiosRequestConfig, Method} from 'axios';
import axios from 'axios';

export const BASE_URL = 'http://localhost:8888/api';

const axiosInstance = axios.create({
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  config => {
    // doing
    return config;
  },
  error => {
    // doing
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    // doing
    if (response?.data?.message) {
      // $message.success(config.data.message)
    }

    return {...response, result: response?.data};
  },
  error => {
    // @ts-ignore
    // history.replace('/login');
    let errorMessage = 'Đã có lỗi xảy ra';
    if (error?.message?.includes('Network Error')) {
      errorMessage = 'Lỗi mạng, vui lòng kiểm tra mạng';
    } else {
      errorMessage = error?.message;
    }
    console.dir(error);
    // error?.message && $message.error(errorMessage);

    return Promise.reject({
      status: false,
      message: errorMessage,
      result: error?.response?.data,
    });
  },
);

export type Response<T = any> = {
  status?: boolean;
  message?: string;
  result: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;
/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  const prefix = '';
  const configRequest = {
    ...config,
    // headers: {
    //   // 'Content-Type': 'application/json',
    //   // Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    //   // 'Authorization': 'Basic QURNSU46QURNSU4='
    // },
  };
  // const token = Authorization.getToken();
  // if (
  //   token &&
  //   window.location.pathname !== ROUTES.LOGIN &&
  //   !window.location.pathname.startsWith(ROUTES.FORGOT_PASSWORD) &&
  //   !window.location.pathname.startsWith(ROUTES.CHANGE_PASSWORD)
  // )
  // if (token) {
  //   // @ts-ignore
  //   configRequest.headers[''] = token;
  // }
  url = prefix + url;
  if (method === 'post') {
    return axiosInstance.post(url, data, configRequest);
  }
  if (method === 'put') {
    return axiosInstance.put(url, data, configRequest);
  }
  if (method === 'delete') {
    return axiosInstance.delete(url, configRequest);
  }

  return axiosInstance.get(url, {
    params: data,
    ...configRequest,
  });
};
