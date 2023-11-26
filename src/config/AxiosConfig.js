import axios from 'axios';
import { API_BASE_URL, BACKEND_ENDPOINT, HTTP_UNAUTHORIZED } from '../utils/Constants.js';

import {
    clearStorage,
    getAccessToken,
    getRefreshToken,
    getSessionId,
    getUsername,
    setAccessToken,
} from '../components/authentication/AuthUtils';
import { renewToken } from '~/components/authentication/AuthEndPoint.jsx';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': 'BX001-',
    },
});

axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        if (!!getSessionId()) {
            config.headers['SessionId'] = getSessionId();
        }

        if (!!getUsername()) {
            config.headers['Username'] = getUsername();
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with\ response data
        return response;
    },
    async function (error) {
        // const history = useHistory()

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        let res = error.response;
        let originalRequest = error.config;

        if (res) {
            switch (res.status) {
                case 302:
                    if (res.data && res.data.redirectUrl) {
                        window.location.href = res.data.redirectUrl;
                    }
                    break;
                case 400:
                    break;
                case 404:
                    break;
                case 401:
                    if (res.config) {
                        if (res.config.url === `${BACKEND_ENDPOINT}/authentication/getToken`) {
                            await Promise.resolve(res.data === HTTP_UNAUTHORIZED);

                            return;
                        } else {
                            if (!originalRequest._retry) {
                                originalRequest._retry = true;

                                delete axiosInstance.defaults.headers.common['Authorization'];

                                if (!!getRefreshToken()) {
                                    await renewToken({
                                        refreshToken: getRefreshToken(),
                                    }).then(async (data) => {
                                        if (data?.token) {
                                            setAccessToken(data.token);

                                            axiosInstance.defaults.headers.common[
                                                'Authorization'
                                            ] = `Bearer ${getAccessToken()}`;

                                            originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;

                                            error = await Promise.resolve(await axiosInstance.request(originalRequest));
                                        } else {
                                            clearStorage();
                                            window.location.assign('/');
                                        }
                                    });
                                } else {
                                    clearStorage();
                                    window.location.assign('/');
                                }
                            }
                        }
                    }
                    break;

                case 403:
                    clearStorage();
                    break;
                case 409:
                    break;
                case 429:
                    break;
                case 440:
                    break;
                case 500:
                    break;
                case 503:
                    break;
                default:
            }
        }

        if (originalRequest?._retry) {
            return Promise.resolve(error);
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
