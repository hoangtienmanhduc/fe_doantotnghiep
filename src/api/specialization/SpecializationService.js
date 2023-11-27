import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function getListSpecializationInfo(
    userId,
    filterRequest = {},
    rows,
    dto = false,
    sortField = 'id',
    sortOrder = -1,
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/specialization/getList`, filterRequest, {
            params: { userId, rows, dto, sortField, sortOrder },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getPageSpecializationInfo(
    userId,
    pageNumber = 0,
    pageRows = 10,
    sortField = 'id',
    sortOrder = -1,
    filterRequest = {},
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/specialization/getPage`, filterRequest, {
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

export function createOrUpdateGenericSpecialization(userId, data = {}) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/specialization/createOrUpdate`, data, {
            params: { userId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
