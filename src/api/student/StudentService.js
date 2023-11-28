import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function getListSchoolYear(userId) {
    return axiosInstance
        .get(`${BACKEND_ENDPOINT}/student/getListSchoolYear`, {
            params: { userId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
