import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Lichthi from '../pages/lichthi';
import Customers from '../pages/taodon';
import Dondagui from '../pages/dondagui'
import Login from '../pages/login/Login';
import LogginSuccess from '../pages/login/LogginSuccess';
import Layout from './layout/Layout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/loginsuccess/:userId' element={<LogginSuccess />} />
            <Route element={<Layout />}>
                <Route path='/' element={<Lichthi />} />
                <Route path='/taodon' element={<Customers />} />
                <Route path='/dondagui' element={<Dondagui />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
