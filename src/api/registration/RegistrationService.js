import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function getListRegistration(userId, filterRequest = {}, rows, dto = false, sortField = 'id', sortOrder = -1) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/registration/getList`, filterRequest, {
            params: { userId, rows, dto, sortField, sortOrder },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getPageRegistrationInfo(
    userId,
    pageNumber = 0,
    pageRows = 10,
    sortField = 'id',
    sortOrder = -1,
    filterRequest = {},
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/registration/getPage`, filterRequest, {
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

export function createOrUpdateGenericRegistration(userId, data = {}) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/registration/createOrUpdate`, data, {
            params: { userId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function changeRegistrationStatus(userId, data = {}) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/registration/changeStatus`, data, {
            params: { userId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
