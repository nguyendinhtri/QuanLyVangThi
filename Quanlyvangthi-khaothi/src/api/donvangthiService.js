// import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook để lấy tất cả dữ liệu đơn vắng thi
export const useFetchAllDonVangThi = () => {
    const [donVangThiData, setDonVangThiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllDonVangThi = async () => {
            try {
                // Fetch tất cả dữ liệu đơn vắng thi từ API
                const response = await axios.get('http://localhost:8345/api/donvangthi/getAllDonVangThi');

                if (response.status === 200) {
                    setDonVangThiData(response.data.elements || []);
                } else {
                    setError('Failed to fetch don vang thi data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllDonVangThi();
    }, []);

    return { donVangThiData, loading, error };
};