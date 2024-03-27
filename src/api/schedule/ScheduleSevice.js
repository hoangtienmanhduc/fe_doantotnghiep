import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function getListScheduleInfo(userId, filterRequest = {}, rows, dto = false, sortField = 'id', sortOrder = -1) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/schedule/getList`, filterRequest, {
            params: { userId, rows, dto, sortField, sortOrder },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getPageSchedule(
    userId,
    pageNumber = 0,
    pageRows = 10,
    sortField = 'id',
    sortOrder = -1,
    filterRequest = {},
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/schedule/getPage`, filterRequest, {
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

export function createOrUpdateSchedule(userId, data) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/schedule/createOrUpdate`, data, {
            params: {
                userId,
            },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function deleteSchedule(userId, id) {
    return axiosInstance
        .delete(`${BACKEND_ENDPOINT}/schedule/deleteById`, {
            params: {
                userId,
                id,
            },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
