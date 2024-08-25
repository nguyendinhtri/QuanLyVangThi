import React, { useState, useEffect } from 'react';
import { useFetchAllUsers, useFetchUserById } from '../api/userService'; // Đường dẫn đến hook
import { useHistory } from 'react-router-dom';

const Ttsinhvien = () => {
    const { users, loading: usersLoading, error: usersError } = useFetchAllUsers();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { user, loading: userLoading, error: userError } = useFetchUserById(selectedUserId);
    const history = useHistory(); // useHistory should be called inside the component
    useEffect(() => {
        if (user) {
            console.log('Selected User ID:', user.id); // Console log user.id khi user được cập nhật
        }
    }, [user]);

    if (usersLoading) return <div>Loading users...</div>;
    if (usersError) return <div>Error: {usersError}</div>;
    

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        history.push(`/donvangthi/${userId}`);
    };

    return (
        <div>
            <h1>Danh sách sinh viên xin vắng thi</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>MSV</th>
                        <th>FULLNAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} onClick={() => handleUserClick(user.id)}>
                            <td>{user.id}</td>
                            <td>{user.MSV}</td>
                            <td>{user.FULLNAME}</td>
                            <td>{user.EMAIL}</td>
                            <td>{user.PHONE}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUserId && (
                <div>
                    {userLoading && <div>Loading user details...</div>}
                    {user && (
                        <div>
                            <h2>User Details</h2>
                            <p>ID: {user.id}</p>
                            <p>MSV: {user.MSV}</p>
                            <p>FULLNAME: {user.FULLNAME}</p>
                            <p>EMAIL: {user.EMAIL}</p>
                            <p>PHONE: {user.PHONE}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Ttsinhvien;
