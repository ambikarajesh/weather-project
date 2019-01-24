import * as actionTypes from '../actionTypes';
import {updateObject} from '../../shared/utility';
const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false
}
const signInReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return updateObject(state, {token:null, userId:null, error:null, loading:true});           
        case actionTypes.AUTH_SUCCESS: return updateObject(state, {token:action.token, userId:action.userId, loading:false});           
        case actionTypes.AUTH_FAIL: return updateObject(state, {error:action.error, loading:false});
        case actionTypes.LOGOUT: return updateObject(state, {token:null, userId:null, error:null, loading:false});            
        default:
            return state;
    }

}

export default signInReducer;