import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_LOCAL_URL}`,
  timeout: 30_000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, // 200대 범위일 때
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          if (error.response.data.message === 'BAD REQUEST') {
            window.dispatchEvent(
              new CustomEvent('axiosError', {
                detail: {
                  message: '400, Bad Request',
                },
              }),
            );
          } else {
            window.dispatchEvent(
              new CustomEvent('axiosError', {
                detail: {
                  message: '401, Unautorizend',
                },
              }),
            );
          }
          return Promise.reject(error);
        case 403:
          window.dispatchEvent(
            new CustomEvent('axiosError', {
              detail: {
                message: '403, Forbidden',
              },
            }),
          );
          return new Promise(() => {});
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

// Axios 에러 리턴
export const isAxiosError = (err: unknown | AxiosError): err is AxiosError => {
  return axios.isAxiosError(err);
};
