import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function createOrUpdateGenericSpecializationClass(userId, data = {}) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/specialization/class/createOrUpdate`, data, {
            params: { userId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getListSpecializationClassInfo(
    userId,
    filterRequest = {},
    rows,
    dto = false,
    sortField = 'id',
    sortOrder = -1,
) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/specialization/class/getList`, filterRequest, {
            params: { userId, rows, dto, sortField, sortOrder },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function separateStudentsByClass(schoolYear) {
    return axiosInstance
        .get(`${BACKEND_ENDPOINT}/specialization/class/separateStudents`, {
            params: { schoolYear },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
