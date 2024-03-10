import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const IMG_API_KEY = '37c918813560a82dbcfcf409da361cac';
export const IMG_END_POINT = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`;

export function uploadImage(formData) {
    return axios
        .post(`${IMG_END_POINT}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
}
