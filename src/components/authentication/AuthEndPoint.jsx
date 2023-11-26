import axiosInstance from '../../config/AxiosConfig';
import { BACKEND_ENDPOINT } from '../../utils/Constants';

export function authenticateUser(data) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/authentication/getToken`, data)
        .then((res) => (res && res?.data ? res.data : null));
}
export function renewToken(data) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/authentication/renewToken`, data)
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function revokeToken(refreshToken) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/authentication/revokeToken`, null, {
            params: { refreshToken },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function changePassword(data) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/authentication/changePassword`, data)
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
