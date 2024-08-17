import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals'

import { createStore } from 'redux'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './redux/reducers'
import reduxStore from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import AppRoutes from './components/Routes';
import Layout from './components/layout/Layout'

const {store, persistor} = reduxStore()

document.title = 'HỆ THỐNG QUẢN LÝ VẮNG THI'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <React.StrictMode>
    <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
