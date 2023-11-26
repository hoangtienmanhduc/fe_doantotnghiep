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
