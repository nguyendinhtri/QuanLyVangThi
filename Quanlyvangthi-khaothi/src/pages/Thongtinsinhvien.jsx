// import React, { useState, useEffect } from 'react';
// import { useFetchAllUsers, useFetchUserById } from '../api/userService'; // Đường dẫn đến hook
// import { useHistory } from 'react-router-dom';

// const Ttsinhvien = () => {
//     const { users, loading: usersLoading, error: usersError } = useFetchAllUsers();
//     const [selectedUserId, setSelectedUserId] = useState(null);
//     const { user, loading: userLoading, error: userError } = useFetchUserById(selectedUserId);
//     const history = useHistory(); // useHistory should be called inside the component
//     useEffect(() => {
//         if (user) {
//             console.log('Selected User ID:', user.id); // Console log user.id khi user được cập nhật
//         }
//     }, [user]);

//     if (usersLoading) return <div>Loading users...</div>;
//     if (usersError) return <div>Error: {usersError}</div>;
    

//     const handleUserClick = (userId) => {
//         setSelectedUserId(userId);
//         history.push(`/donvangthi/${userId}`);
//     };

//     return (
//         <div>
//             <h1>Danh sách sinh viên xin vắng thi</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>MSV</th>
//                         <th>FULLNAME</th>
//                         <th>EMAIL</th>
//                         <th>PHONE</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id} onClick={() => handleUserClick(user.id)}>
//                             <td>{user.id}</td>
//                             <td>{user.MSV}</td>
//                             <td>{user.FULLNAME}</td>
//                             <td>{user.EMAIL}</td>
//                             <td>{user.PHONE}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedUserId && (
//                 <div>
//                     {userLoading && <div>Loading user details...</div>}
//                     {user && (
//                         <div>
//                             <h2>User Details</h2>
//                             <p>ID: {user.id}</p>
//                             <p>MSV: {user.MSV}</p>
//                             <p>FULLNAME: {user.FULLNAME}</p>
//                             <p>EMAIL: {user.EMAIL}</p>
//                             <p>PHONE: {user.PHONE}</p>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Ttsinhvien;

import React, { useState, useEffect } from 'react';
import { useFetchAllDonVangThi, useFetchDonVangThi } from '../api/donvangthiService'; // Cập nhật đường dẫn và hook
import { useHistory } from 'react-router-dom';
import UpdateTrangThaiButton from '../components/buttton/UpdateTrangThaiButton';
import ExportData from '../utils/exportdata';
import './Ttsinhvien.css'; // Import CSS

const Ttsinhvien = () => {
    const { donVangThiData, loading: donVangThiLoading, error: donVangThiError } = useFetchAllDonVangThi();
    const [selectedDonVangThiId, setSelectedDonVangThiId] = useState(null);
    const { donVangThi, loading: donVangThiDetailLoading, error: donVangThiDetailError } = useFetchDonVangThi(selectedDonVangThiId);
    const history = useHistory();

    useEffect(() => {
        if (donVangThi) {
            console.log('Selected Don Vang Thi ID:', donVangThi.USER_ID); // Console log USER_ID khi donVangThi được cập nhật
        }
    }, [donVangThi]);

    if (donVangThiLoading) return <div>Loading Don Vang Thi...</div>;
    if (donVangThiError) return <div>Error: {donVangThiError}</div>;

    const handleDonVangThiClick = (donVangThiId) => {
        
        setSelectedDonVangThiId(donVangThiId);
        history.push(`/donvangthi/${donVangThiId}`);
        
    };
    

    return (
        <div>
            
            <div className="row" id='header'>
                <div className="col-10">
                <h1>Danh sách đơn xin vắng thi</h1>
                </div>
                    <div id="butt" className="col-2">
                        <ExportData />
                    </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>MSV</th>
                            <th>Tên sinh viên</th>
                            <th>EMAIL</th>
                            <th>SĐT</th>
                            <th>Ngày Gửi</th>
                            <th>Lý Do Vắng Thi</th>
                            <th>Trạng Thái</th>
                            <th></th>
                        </tr>
                        
                    
                    </thead>
                    <tbody>
                        {donVangThiData.map((donVangThi,index) => (
                            <tr key={donVangThi.USER_ID} onClick={() => handleDonVangThiClick(donVangThi.USER_ID)}>
                                <td>{index + 1}</td>
                                <td>{donVangThi.User.MSV}</td>
                                <td>{donVangThi.User.FULLNAME}</td>
                                <td>{donVangThi.User.EMAIL}</td>
                                <td>{donVangThi.User.PHONE}</td>
                                <td>{new Date(donVangThi.NGAY_GUI).toLocaleDateString('vi-VN')}</td>
                                <td>{donVangThi.LY_DO_VANG_THI}</td>
                                <td>{donVangThi.TRANG_THAI}</td>
                                <td onClick={(event) => event.stopPropagation()}>
                                    {/* Thêm nút UpdateTrangThaiButton cho mỗi đơn */}
                                    <UpdateTrangThaiButton  userId={donVangThi.USER_ID}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedDonVangThiId && (
                <div>
                    {donVangThiDetailLoading && <div>Loading Don Vang Thi details...</div>}
                    {donVangThi && (
                        <div>
                            <h2>Don Vang Thi Details</h2>
                            <p>ID: {donVangThi.USER_ID}</p>
                            <p>MSV: {donVangThi.User.MSV}</p>
                            <p>FULLNAME: {donVangThi.User.FULLNAME}</p>
                            <p>EMAIL: {donVangThi.User.EMAIL}</p>
                            <p>PHONE: {donVangThi.User.PHONE}</p>
                            <p>Ngày Gửi: {new Date(donVangThi.NGAY_GUI).toLocaleDateString('vi-VN')}</p>
                            <p>Lý Do Vắng Thi: {donVangThi.LY_DO_VANG_THI}</p>
                            <p>Trạng Thái: {donVangThi.TRANG_THAI}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Ttsinhvien;
