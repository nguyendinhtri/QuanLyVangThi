import React from "react";
import axios from "axios";

class ExportData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donVangThiData: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchAllDonVangThi();
    }

    fetchAllDonVangThi = async () => {
        try {
            const response = await axios.get('http://localhost:8345/api/donvangthi/getAllDonVangThi');
            if (response.status === 200) {
                this.setState({
                    donVangThiData: response.data.elements || [],
                    loading: false,
                });
            } else {
                this.setState({
                    error: 'Failed to fetch don vang thi data',
                    loading: false,
                });
            }
        } catch (err) {
            this.setState({
                error: err.message,
                loading: false,
            });
        }
    };

    exportDatatoCSV = () => {
        const { donVangThiData } = this.state;
        if (donVangThiData.length === 0) {
            alert("No data available to export");
            return;
        }

        const csvContent = this.convertToCSV(donVangThiData);
        // Thêm Byte Order Mark (BOM) vào đầu nội dung CSV để hỗ trợ tiếng Việt
        const bom = "\uFEFF";
        const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'don_vang_thi_data.csv');
        link.click();
    };

    convertToCSV(data) {
        const headers = Object.keys(data[0]);
        const rows = data.map((obj) => headers.map((header) => obj[header]));
        const headerRow = headers.join(',');
        const csvRows = [headerRow, ...rows.map((row) => row.join(","))];
        return csvRows.join('\n');
    }

    render() {
        const { loading, error } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <div>
                <button onClick={this.exportDatatoCSV}>Export CSV</button>
            </div>
        );
    }
}

export default ExportData;
