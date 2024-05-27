import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function createOrUpdatedateProgram(userId, data) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/program/createOrUpdate`, data, {
            params: {
                userId,
            },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getPageProgramInfo(
    userId,
    pageNumber = 0,
    pageRows = 10,
    sortField = 'id',
    sortOrder = -1,
    filterRequest = {},
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/program/getPage`, filterRequest, {
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

export function getListProgramInfo(userId, filterRequest = {}, rows, dto = false, sortField = 'id', sortOrder = -1) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/program/getList`, filterRequest, {
            params: { userId, rows, dto, sortField, sortOrder },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getListStudentProgramInfo(userId, studentId) {
    return axiosInstance
        .post(
            `${BACKEND_ENDPOINT}/program/getListByStudent`,
            {},
            {
                params: { userId, studentId },
            },
        )
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getLatestProgram(userId, specializationId) {
    return axiosInstance
        .post(
            `${BACKEND_ENDPOINT}/program/getLatestProgram`,
            {},
            {
                params: { userId, specializationId },
            },
        )
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
