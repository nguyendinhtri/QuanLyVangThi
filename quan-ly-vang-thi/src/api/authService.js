import axios from 'axios';

export const apiLoginSuccess = (userId) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios.post('http://localhost:8345/api/auth/loginsuccess', { id: userId });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
