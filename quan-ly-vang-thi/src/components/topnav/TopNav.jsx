import React, {useEffect, useState} from 'react';
import './topnav.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../dropdown/Dropdown';
import ThemeMenu from '../thememenu/ThemeMenu';
import user_image from '../../assets/images/users.png';
import user_menu from '../../assets/JsonData/user_menus.json';
import { logout } from '../../redux/actions/authAction';
import { apiGetOne } from '../../api/userService';

// Hàm này sẽ xử lý khi người dùng bấm vào mục menu
const handleMenuClick = (item, dispatch, navigate) => {
    if (item.content === 'Logout') {
        dispatch(logout());  // Gọi hàm logout từ redux
        navigate('/')
    } else {
        console.log('Menu item clicked:', item);
    }
};

// Hàm này tạo ra các mục menu với sự kiện onClick
const renderUserMenu = (item, index, dispatch, navigate) => (
    <div
        key={index}
        className="notification-item"
        onClick={() => handleMenuClick(item, dispatch, navigate)}
    >
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
);

const renderUserToggle = (name, image) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {name || 'Guest'}
        </div>
    </div>
);

const Topnav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, token } = useSelector(state => state.auth);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            let response = await apiGetOne(token);
            console.log(response);
            if (response?.data.err === 0) {
                setUserData(response.data?.response);
            } else {
                setUserData({});
            }
        }
        fetchUser();
    }, [isLoggedIn]);

    return (
        <div className='topnav'>
            <div className="topnav__search">
                {/* Có thể thêm thanh tìm kiếm nếu cần */}
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* Dropdown */}
                    <Dropdown
                        customToggle={() => renderUserToggle(userData?.FULLNAME || userData?.fullname, user_image)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index, dispatch, navigate)}
                    />
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu />
                </div>
            </div>
        </div>
    );
}

export default Topnav;
