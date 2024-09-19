import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/table/Table';
import ExportData from '../utils/exportdata';
import UpdateTrangThaiButton from '../components/buttton/UpdateTrangThaiButton';
import { useFetchAllDonVangThi } from '../api/donvangthiService';
import './style.css';

const TableHead = [
    'STT',
    'Tên Sinh Viên',
    'Mã Sinh Viên',
    'SĐT',
    'Ngày Gửi',
    'Lý Do Vắng Thi',
    'Trạng Thái',
    'Cập Nhật Trạng Thái' // Thêm cột mới cho nút cập nhật trạng thái
];



const Dashboard = () => {
    const { donVangThiData, loading, error } = useFetchAllDonVangThi();
    const renderHead = (item, index) => <th key={index}>{item}</th>;

    const renderBody = (item, index) => (
        <tr key={index} onClick={() => handleUserClick(donVangThiData)}>
            <td>{index + 1}</td>
            {item.User && (
                <>
                    <td>{item.User.FULLNAME}</td>
                    <td>{item.User.MSV}</td>
                    <td>{item.User.PHONE}</td>
                </>
            )}
            <td>{new Date(item.NGAY_GUI).toLocaleDateString('vi-VN')}</td>
            <td>{item.LY_DO_VANG_THI}</td>
            <td>{item.TRANG_THAI}</td>
            <td>
                {/* Thêm nút UpdateTrangThaiButton cho mỗi đơn */}
                <UpdateTrangThaiButton userId={item.USER_ID} />
            </td>
        </tr>
    );

    const handleUserClick = () => {
        console.log(donVangThiData)

        // Thực hiện hành động tương ứng với sự kiện click
    };
    
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div>
            <h2 className="page-header">Danh sách xin vắng thi</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__header">
                            <div className="row">
                                <div className="col-10">
                                    <h3>Danh Sách</h3>
                                </div>
                                <div id="butt" className="col-2">
                                    <ExportData />
                                </div>
                            </div>
                        </div>

                        <div className="card__body">
                            <Table 
                                limit="10"
                                headData={TableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={donVangThiData}
                                renderBody={(item, index) => renderBody(item, index)}
                                
                            />
                        </div>
                        <div className="card__footer">
                            <Link to="/">view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
