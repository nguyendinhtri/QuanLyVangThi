import React from 'react';
import { Outlet } from 'react-router-dom'; // Để render các route con

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <Outlet /> {/* Render các route con */}
        </div>
    );
};

export default AuthLayout;