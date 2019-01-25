import * as actionTypes from '../actionTypes';
import * as APIKeys from '../../APIkeys/APIKeys';
import axios from 'axios';


export const authStart = () => {
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}
export const authFail = (error) => { 
    
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logoutAll = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireDate')
    return{
        type:actionTypes.LOGOUT
    }
}

export const logout = () => {
    return dispatch =>{
        dispatch(logoutAll());
        dispatch({type:actionTypes.CLEAR_CITIES})
    }
}
export const authTimeOut = (time) => {
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        }, time*1000)

    }
}

export const signUporIn = (email, password, isSignUp) => {
    return dispatch =>{
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        dispatch(authStart());
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKeys.FirebaseAPI}`;
        if(!isSignUp){
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKeys.FirebaseAPI}`;
        }
        axios.post(url, authData).then(res =>{
            localStorage.setItem("idToken", res.data.idToken);
            localStorage.setItem('userId', res.data.localId)
            const expireDate = new Date(new Date().getTime()+res.data.expiresIn *1000)
            localStorage.setItem('expireDate', expireDate)
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(authTimeOut(res.data.expiresIn))
        }).catch(error =>{
            dispatch(authFail(error.response.data.error))
        })
    }
}



export const retainState = () => {
    return dispatch => {        
        const idToken = localStorage.getItem('idToken');
        if(idToken){
            let expireDate  = (new Date(localStorage.getItem('expireDate')).getTime()-new Date().getTime())/1000;
            if(expireDate<0){                
                dispatch(logout());
            }
            else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(idToken, userId));
                dispatch(authTimeOut(expireDate))
            }
        }
    }
}