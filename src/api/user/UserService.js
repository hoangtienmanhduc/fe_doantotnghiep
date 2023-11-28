import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function getUserInfo(userId, id) {
    return axiosInstance
        .get(`${BACKEND_ENDPOINT}/user/getById`, {
            params: { userId, id },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => console.log(error));
}

export function createOrUpdateGenericUser(userId, data = {}) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/user/createOrUpdate`, data, {
            params: { userId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getPageUser(
    userId,
    pageNumber = 0,
    pageRows = 10,
    sortField = 'id',
    sortOrder = -1,
    filterRequest = {},
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/user/getPage`, filterRequest, {
            params: {
                userId,
                pageNumber,
                pageRows,
                sortField,
                sortOrder,
            },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
