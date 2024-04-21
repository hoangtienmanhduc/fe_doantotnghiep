import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function inputResults(userId, data = {}) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/registration/inputResult`, data, {
            params: { userId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function saveFinalResults(userId, sectionClassId) {
    return axiosInstance
        .post(`${BACKEND_ENDPOINT}/registration/saveResultFinal`, null, {
            params: { userId, sectionClassId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
