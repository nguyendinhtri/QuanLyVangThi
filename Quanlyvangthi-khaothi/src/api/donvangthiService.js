// import React from 'react';
import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
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

export const useFetchDonVangThi = (userId) => {
    const [donVangThiData, setDonVangThiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonVangThi = async () => {
            try {
                    const response = await axios.get(`http://localhost:8345/api/donvangthi/getDonVangThiByUserId/${userId}`);
                        if (response.status === 200) {
                            setDonVangThiData(response.data.elements);
                            // setUser(response.data.elements);
                        } else {
                            setError(response.data.message || 'Failed to fetch don vang thi data');
                        }  
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        
        if (userId) {
            fetchDonVangThi(userId);
        } else {
            setLoading(false);
            setError('User ID is required');
        }
        
        
    }, [userId]);

    return { donVangThiData, loading, error };
};

export const createDonVangThi = async (donVangThi) => {
    try {
        const response = await axios.post(`http://localhost:8345/api/donVangThi/createDonVangThi`, donVangThi);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating Don Vang Thi');
    }
};
export const updateDonVangThi = async (data) => {
    try {
        const response = await axios.patch('http://localhost:8345/api/donVangThi/updateDonVangThi', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating Don Vang Thi');
    }
};
export const uploadMinhChung = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8345/api/donVangThi/uploadMinhChung', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating Don Vang Thi');
    }
};