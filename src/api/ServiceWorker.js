import axiosInstance from '../config/AxiosConfig';
import { BACKEND_ENDPOINT } from '../Constants';

export function createOrUpdateGenericInfo(path, userId, data = {}) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/${path}/createOrUpdate`, data, {
            params: { userId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getGenericInfo(path, userId, id, treatAsRole) {
    return axiosInstance
        .get(`${BACKEND_ENDPOINT}/${path}/getById`, {
            params: { userId, id, treatAsRole },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => console.log(error));
}

export function getPageGenericInfo(
    path,
    userId,
    pageNumber = 0,
    pageRows = 10,
    sortField = 'id',
    sortOrder = -1,
    filterRequest = {},
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/${path}/getPage`, filterRequest, {
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

export function getListGenericInfo(
    path,
    userId,
    filterRequest = {},
    rows,
    dto = false,
    sortField = 'id',
    sortOrder = -1,
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/${path}/getList`, filterRequest, {
            params: { userId, rows, dto, sortField, sortOrder },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function deleteGenericInfo(path, userId, id) {
    return axiosInstance
        .delete(`${BACKEND_ENDPOINT}/${path}/deleteById`, {
            params: { userId, id },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
