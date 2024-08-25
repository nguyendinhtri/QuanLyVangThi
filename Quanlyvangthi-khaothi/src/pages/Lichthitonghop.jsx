import React from 'react';
import Table from '../components/table/Table';
import { useFetchAllLichThi } from "../api/lichthiServ"

const TableHead = [
    'Tên Học Phần',
    'Giảng Viên',
    'Số Tín Chỉ',
    'Hình Thức Thi',
    'Ngày Thi',
    'Giờ Thi',
    'Phòng Thi'
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.TEN_HOC_PHAN}</td>
        <td>{item.GIANG_VIEN}</td>
        <td>{item.SO_TIN_CHI}</td>
        <td>{item.HINH_THUC_THI}</td>
        <td>{new Date(item.NGAY_THI).toLocaleDateString('vi-VN')}</td> {/* Chuyển đổi ngày nếu cần */}
        <td>{item.GIO_THI}</td>
        <td>{item.PHONG_THI}</td>
    </tr>
);

const Lichthitonghop = () => {
    const { lichThiData, loading, error } = useFetchAllLichThi();

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div>
            <h2 className="page-header">LỊCH THI</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={TableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={lichThiData}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lichthitonghop;