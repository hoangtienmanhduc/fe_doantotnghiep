import axiosInstance from '~/config/AxiosConfig';
import { BACKEND_ENDPOINT } from '~/utils/Constants';

export function getListRegion() {
    return axiosInstance
        .get(`${BACKEND_ENDPOINT}/address/getRegions`, {
            params: {},
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getListWard(districtCode) {
    return axiosInstance
        .get(`${BACKEND_ENDPOINT}/address/getWards`, {
            params: { districtCode },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getListProvince(regionId) {
    return axiosInstance
        .get(`${BACKEND_ENDPOINT}/address/getProvinces`, {
            params: { regionId },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}

export function getListDistrict(provinceCode) {
    return axiosInstance
        .get(`${BACKEND_ENDPOINT}/address/getDistrict`, {
            params: { provinceCode },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
