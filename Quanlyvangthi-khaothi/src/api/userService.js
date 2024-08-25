import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8345/api/user/getAllUser');
                if (response.status === 200) {
                    setUsers(response.data.elements || []);
                } else {
                    setError('Failed to fetch users');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};
export const useFetchUserById = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserById = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:8345/api/user/getIdUser/${userId}`);
                if (response.status === 200) {
                    setUser(response.data.elements);
                } else {
                    setError(response.data.message || 'Failed to fetch user');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        
        fetchUserById(userId);
        
    }, [userId]);

    return { user, loading, error };
};
