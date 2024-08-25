import { useState } from 'react';
import axios from 'axios';

export const useUpdateDonVangThi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateDonVangThi = async (donVangThiId, donVangThiData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Sửa URL bằng cách đặt nó trong dấu ngoặc kép
            const response = await axios.put(
                `http://localhost:8345/api/donvangthi/updateDonVangThi/${donVangThiId}`,
                donVangThiData
            );

            // Xử lý phản hồi từ API
            if (response.status === 200) {
                setSuccess(true);
            } else {
                // Có thể có thông tin chi tiết hơn trong response.data
                setError('Failed to update DonVangThi: ' + (response.data.message || 'Unknown error'));
            }
        } catch (err) {
            // Xử lý lỗi từ phản hồi của API
            setError('Failed to update DonVangThi: ' + err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateDonVangThi, loading, error, success };
};
