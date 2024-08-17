import React, { useEffect } from 'react';
import './layout.css';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../topnav/TopNav';
import AppRoutes from '../Routes'; // Đổi tên để tránh trùng lặp với `Routes` từ `react-router-dom`
import { useSelector, useDispatch } from 'react-redux';
import ThemeAction from '../../redux/actions/ThemeAction';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const themeReducer = useSelector(state => state.ThemeReducer);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Chuyển đổi thành boolean
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Lưu ý rằng useNavigate là một hook, không phải là một thành phần

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode') || 'theme-mode-light';
        const colorClass = localStorage.getItem('colorMode') || 'theme-mode-light';

        dispatch(ThemeAction.setMode(themeClass));
        dispatch(ThemeAction.setColor(colorClass));

        // Kiểm tra người dùng đã đăng nhập chưa
        if (isLoggedIn === "false" || isLoggedIn === false) {
            navigate('/login'); // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
        }
    }, [dispatch, isLoggedIn, navigate]);

    return (
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
            <Sidebar />
            <div className="layout__content">
                <TopNav />
                <div className="layout__content-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
