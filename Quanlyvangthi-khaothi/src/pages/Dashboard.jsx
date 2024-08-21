import React from 'react'

import { Link } from 'react-router-dom'

import Table from '../components/table/Table'

// import Badge from '../components/badge/Badge'

import ExportData from '../utils/exportdata'

import ToggleSwitch from '../components/buttton/ToggleSwitch'

import { useFetchAllDonVangThi } from '../api/donvangthiService'

import './style.css'; 

// const latestOrders = {
//     header: [
//         "STT",
//         "Họ Tên",
//         "MSV",
//         "Ngày tạo đơn",
//         "Lý do từ chối",
//         "Trạng thái",
//         "Xác nhận"
//     ],
//     body: [
//         {
//             id: "#OD1711",
//             user: "john doe",
//             date: "17 Jun 2021",
//             price: "$900",
//             accept: "",
//             status: "Chờ Duyệt"
//         },
//         {
//             id: "#OD1712",
//             user: "frank iva",
//             date: "1 Jun 2021",
//             price: "$400",
//             accept: "",
//             status: "Đã Duyệt"
//         },
//         {
//             id: "#OD1713",
//             user: "anthony baker",
//             date: "27 Jun 2021",
//             price: "$200",
//             accept: "Ko đủ minh chứng",
//             status: "Chờ Duyệt"
//         },
//         {
//             id: "#OD1712",
//             user: "frank iva",
//             date: "1 Jun 2021",
//             price: "$400",
//             accept: "",
//             status: "Đã Duyệt"
//         },
//         {
//             id: "#OD1713",
//             user: "anthony baker",
//             date: "27 Jun 2021",
//             price: "$200",
//             accept: "",
//             status: "Chờ Duyệt"
//         }
//     ]
// }

// const orderStatus = {
//     "Đã Duyệt": "success",
//     "Chờ Duyệt": "danger"
// }

// const renderOrderHead = (item, index) => (
//     <th key={index}>{item}</th>
// )

// const renderOrderBody = (item, index) => (
//     <tr key={index}>
//         <td>{item.id}</td>
//         <td>{item.user}</td>
//         <td>{item.price}</td>
//         <td>{item.date}</td>
//         <td>{item.accept}</td>
//         <td>
//             <Badge type={orderStatus[item.status]} content={item.status}/>
//         </td>
//         <td>
//             <ToggleSwitch type={orderStatus[item.status]} content={item.status}/>
//         </td>
//     </tr>
// )

const TableHead = [
    'Ngày Gửi',
    'Lý Do Vắng Thi',
    'Trạng Thái',
    'Lý Do Từ Chối',
    'Minh Chứng'
];
const orderStatus = {
        "Đã Duyệt": "success",
        "Chờ Duyệt": "danger"
     }
const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{new Date(item.NGAY_GUI).toLocaleDateString('vi-VN')}</td> {/* Chuyển đổi ngày nếu cần */}
        <td>{item.LY_DO_VANG_THI}</td>
        <td>{item.TRANG_THAI}</td>
        <td>{item.LY_DO_TU_CHOI}</td>
        <td>{item.MINH_CHUNG}</td>
        <td>
            <ToggleSwitch type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
);

const Dashboard = () => {
    const { donVangThiData, loading, error } = useFetchAllDonVangThi();

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi: {error}</p>;
    return (
        <div>
            <h2 className="page-header">Danh sách đơn xin vắng thi</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__header">
                            <div className="row">  
                                <div className="col-10">
                                    <h3>Danh Sách</h3>
                                </div>
                                <div id="butt" className="col-2">
                                    {/* <label htmlFor='import' className="btn btn-warning">
                                        <i className="fa-solid fa-file-import"></i>Export CSV
                                    </label> */}
                                    <ExportData />
                                </div>
                            </div>  
                        </div>
                        
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={TableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={donVangThiData}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
