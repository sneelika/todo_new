import axios from 'axios';

export const BASE_URL = 'http://18.208.245.13:1337';
export const TOKEN_IDENTIFIER = 'todoToken';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export let refresh = false;

axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const response = await axios.get('/new-token', {withCredentials: true});

      if (response.status === 200) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `${response.data['token']}`;

        return axios(error.config);
      }
    }
    refresh = false;
    return Promise.reject(error);
  },
);

export const fetcher = (url: string) =>
  axiosInstance.get(url).then(res => res.data);

export default axiosInstance;
