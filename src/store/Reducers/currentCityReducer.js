import * as actionTypes from '../actionTypes';
const initialState = {
    city:null,
    loading:false
}

const currentCityReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_CURRENTCITY_WEATHER_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_CURRENTCITY_WEATHER_SUCCESS:
            return{
                ...state,
                city:[action.city],
                loading:false
            }
        case actionTypes.FETCH_CURRENTCITY_WEATHER_FAIL:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default currentCityReducer;