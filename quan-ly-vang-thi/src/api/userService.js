import axios from 'axios';

export const apiGetOne = (token) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            method: 'get',
            url: 'http://localhost:8345/api/user/get-one',
            headers: {
                Authorization: `Bearer ${token}` // Sử dụng Authorization thay vì authentication
            }
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
