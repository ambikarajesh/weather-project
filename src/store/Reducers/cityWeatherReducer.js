import * as actionTypes from '../actionTypes';
const initialState = {
    header:null,
    footer:null,
    hourly:null,
    loading:false
}

const cityWeatherReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_CITY_WEATHER_START:
            return{
                ...state,
                header:null,
                footer:null,
                hourly:null,
                loading:true,
            }
        case actionTypes.FETCH_CITY_WEATHER_SUCCESS:
            return{
                ...state,
                header:action.header,
                footer:action.footer,
                hourly:action.hourly,
                loading:false
            }
        case actionTypes.FETCH_CITY_WEATHER_FAIL:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default cityWeatherReducer;