import ThemeReducer from "./ThemeReducer"
import { combineReducers } from "redux"
import authReducer from "./authReducer"
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2"


const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}
const authConfig = {
    ...commonConfig,
    key: 'auth',
    whilelist: ['isLoggedIn, token']
}
const rootReducer = combineReducers({
    ThemeReducer,
    auth: persistReducer(authConfig, authReducer)
})

export default rootReducer