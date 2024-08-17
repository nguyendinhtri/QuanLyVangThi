import React, { useEffect } from 'react';
import { logginSuccess } from '../../redux/actions/authAction';
import { useParams,Navigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'

const LogginSuccess = () => {
    const { userId } = useParams() // Lấy userId từ đối tượng useParams
    const dispatch = useDispatch()
    const {isLoggedIn} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(logginSuccess( userId))

        
    }, []); // Thêm userId vào dependency array để useEffect chạy lại khi userId thay đổi

    return (
        <div>
            {isLoggedIn && <Navigate to={'/'} replace = {true} />}
        </div>
    );
};

export default LogginSuccess;
