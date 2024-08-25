import React, { useState } from 'react';
import { updateDonVangThi } from '../../api/donvangthiService';
import {  toast  } from 'react-toastify';
import './UpdateTrangThaiButton.css';

const UpdateTrangThaiButton = ({ userId }) => {
    // State để lưu trạng thái hiện tại
    const [trangThai, setTrangThai] = useState('Chờ Duyệt'); // Giá trị mặc định là 'Chờ Duyệt'

    // Hàm xử lý cập nhật trạng thái
    const handleUpdateTrangThai = async () => {
        try {
            const dataToUpdate = {
                id: userId,
                TRANG_THAI: trangThai === 'Chờ Duyệt' ? 'Đã Duyệt' : 'Chờ Duyệt', // Chuyển đổi trạng thái
            };

            const response = await updateDonVangThi(dataToUpdate);

            if (response.status === 200) {
                // Cập nhật thành công
                toast.success('Cập nhật trạng thái thành công!');
                setTrangThai(dataToUpdate.TRANG_THAI); // Cập nhật lại trạng thái trong state
            } else {
                // Thất bại
                toast.error('Lỗi khi cập nhật trạng thái!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error.message);
            toast.error('Có lỗi xảy ra!');
        }
    };

    return (
        <div className="update-button-container">
            <button className="update-button" onClick={handleUpdateTrangThai}>
                Duyệt 
            </button>
        </div>
    );
};

export default UpdateTrangThaiButton;
