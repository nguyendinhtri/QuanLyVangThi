import React from 'react';
import './login.css';

const Login = () => {
    const googleAuth = () => {
        window.open(`http://localhost:8345/api/auth/google`, "_self");
    };

    return (
        <div className="login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <img src="/vku-logo.png" alt="VKU Logo" style={{ width: 300, height: 200 }} />
            <h1 style={{ fontSize: 30, fontWeight: 'bold' }}>HỆ THỐNG QUẢN LÝ VẮNG THI</h1>
            <img src="/device.png" alt="Device" style={{ width: 470, height: 200 }} />
            <button className="button" onClick={googleAuth}>
                Đăng nhập hệ thống
            </button>
        </div>
    );
};

export default Login;
