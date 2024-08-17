import axios from 'axios';

export const apiGetAllLichThi = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axios.get('http://localhost:8345/api/lichthi/getAllLichThi');
        resolve(response);
        return response.data;
    } catch (error) {
        reject(error);
    }
});
