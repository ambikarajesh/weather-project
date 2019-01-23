import * as actionTypes from '../actionTypes';
const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false
}
const signInReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                toke:null,
                userId:null,
                error:null,
                loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token:action.token,
                userId:action.userId,
                loading:false
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                token:null,
                userId:null,
                error:null,
                loading:false
            }
        default:
            return state;
    }

}

export default signInReducer;