import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from '../components/table/Table'
import './donvangthis.css';
import { useHistory } from 'react-router-dom';

const Donvangthis = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [donVangThiData, setDonVangThiData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [lichThiData, setLichThiData] = useState([]); // Lưu dữ liệu lịch thi
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userIf, setUserIf] = useState(null);
    useEffect(() => {
        const fetchDonVangThi = async () => {
            try {
                const response1 = await axios.get(`http://localhost:8345/api/user/getIdUser/${userId}`);
                const response = await axios.get(`http://localhost:8345/api/donvangthi/getDonVangThiByUserId/${userId}`);
                setUserInfo(response.data.elements.userInfo || {});
                setDonVangThiData(response.data.elements.donVangThi || []);
                setUserIf(response1.data.elements)
                // Giả sử dữ liệu lịch thi nằm trong donVangThiData
                // Cập nhật lichThiData từ donVangThiData
                const lichThi = response.data.elements.donVangThi.flatMap(dv => dv.Lich_This || []);
                setLichThiData(lichThi);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDonVangThi();
    }, [userId]);

    const getTrangThaiColor = (trangThai) => {
        switch (trangThai) {
            case 'Chờ duyệt':
                return 'orange';
            case 'Đã duyệt':
                return 'green';
            case 'Bị từ chối':
                return 'red';
            default:
                return 'black';
        }
    };

    const rearrangeName = (fullName) => {
        if (!fullName) return '';
        const nameParts = fullName.split(' ');
        const firstName = nameParts.shift();
        nameParts.push(firstName);
        return nameParts.join(' ');
    };

    const TableHead = ['Tên học phần', 'Giảng viên', 'Số tín chỉ', 'Hình thức thi', 'Ngày thi', 'Giờ thi', 'Phòng thi'];
    
    const renderHead = (item, index) => (
        <th key={index}>{item}</th>
    );

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.TEN_HOC_PHAN}</td>
            <td>{item.GIANG_VIEN}</td>
            <td>{item.SO_TIN_CHI}</td>
            <td>{item.HINH_THUC_THI}</td>
            <td>{new Date(item.NGAY_THI).toLocaleDateString('vi-VN')}</td>
            <td>{item.GIO_THI}</td>
            <td>{item.PHONG_THI}</td>
        </tr>
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const evenButton = () => {
        history.push('/ttsinhvien')

    }

    return (
        <div>
            <h2 className="page-header" style={{ color: getTrangThaiColor(donVangThiData[0]?.TRANG_THAI) }}>
                TRẠNG THÁI ĐƠN: {donVangThiData[0]?.TRANG_THAI}
            </h2>
            {donVangThiData[0]?.LY_DO_TU_CHOI && (
                <div className="info-row">
                    <h2 className='dondagui'>Lý Do Từ Chối: {donVangThiData[0]?.LY_DO_TU_CHOI}</h2>
                </div>
            )}
            <div className="info-row">
                <h1>I. THÔNG TIN SINH VIÊN:</h1>
            </div>

            <div className="info-row">
                <h2>Họ và Tên: {rearrangeName(userInfo?.FULLNAME?.toUpperCase())}</h2>
                <h2>MSV: {userInfo?.MSV?.toUpperCase()}</h2>
                <h2>SĐT: {userIf?.PHONE?.toUpperCase()}</h2>
            </div>
            <div className="info-row">
                <h1>II. THÔNG TIN ĐƠN:</h1>
            </div>
            <div className="info-row">
                <h2>Ngày Gửi: {new Date(donVangThiData[0]?.NGAY_GUI).toLocaleDateString('vi-VN')}</h2>
            </div>
            <div className="info-row">
                <h2>Học Phần Xin Vắng Thi:</h2>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                headData={TableHead}
                                limit='10'
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={lichThiData}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="info-row">
                <h2 className='dondagui'>Lý Do Vắng Thi: {donVangThiData[0]?.LY_DO_VANG_THI}</h2>
            </div>
            <div>
                <h1>Minh Chứng:</h1>
                {/* <img src={`http://localhost:8345/uploads/${donVangThiData[0]?.MINH_CHUNG}`} alt="Uploaded" style={{ width: '300px', height: 'auto', border: '2px solid #000' }} /> */}
            </div>

            <div id="butt" className='button-container'>
                <button onClick={evenButton}>Trở về</button>
            </div>    
            
        </div>
    );
};

export default Donvangthis;