import axios from 'axios';

export const apiLoginSuccess = (emails) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios.post('http://localhost:8345/api/auth/loginsuccess', { email: emails });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
