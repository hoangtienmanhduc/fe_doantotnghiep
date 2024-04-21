import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function getPageSectionClassInfo(
    userId,
    pageNumber = 0,
    pageRows = 10,
    sortField = 'id',
    sortOrder = -1,
    filterRequest = {},
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/section/class/getPage`, filterRequest, {
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

export function getListSectionClassInfo(
    userId,
    filterRequest = {},
    rows,
    dto = false,
    sortField = 'id',
    sortOrder = -1,
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/section/class/getList`, filterRequest, {
            params: { userId, rows, dto, sortField, sortOrder },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getListStudentSectionClassInfo(
    userId,
    filterRequest = {},
    rows,
    dto = false,
    sortField = 'id',
    sortOrder = -1,
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/registration/getList`, filterRequest, {
            params: { userId, rows, dto, sortField, sortOrder },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function createOrUpdateGenericSectionClass(userId, data = {}) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/section/class/createOrUpdate`, data, {
            params: { userId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function createOrUpdateGenericTimeAndPlace(userId, sectionClassId, data = {}) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/section/class/createOrUpdateTimeAndPlace`, data, {
            params: { userId, sectionClassId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getSectionClassInfo(userId, id) {
    return axiosInstance
        .get(`${BACKEND_ENDPOINT}/section/class/getById`, {
            params: { userId, id },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
