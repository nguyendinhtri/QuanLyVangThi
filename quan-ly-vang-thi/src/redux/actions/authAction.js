import { apiLoginSuccess, logginSuccessService } from "../../api/authService";
import actionTypes from "./actionTypes";

export const logginSuccess = (id) => async(dispatch) => {
    try {
        let response = await apiLoginSuccess(id)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token
            })
        }
        else{
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            data: null
        })
        
    } 

}
export const logout = () =>({
    type: actionTypes.LOGOUT
})