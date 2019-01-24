import * as actionTypes from '../actionTypes';
import {updateObject} from '../../shared/utility';
const initialState = {
    header:null,
    footer:null,
    hourly:null,
    loading:false
}

const cityWeatherReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_CITY_WEATHER_START:return updateObject(state, {header:null, footer:null, hourly:null, loading:true})           
        case actionTypes.FETCH_CITY_WEATHER_SUCCESS:return updateObject(state, {header:action.header, footer:action.footer, hourly:action.hourly, loading:false});           
        case actionTypes.FETCH_CITY_WEATHER_FAIL: return updateObject(state, {loading:false})            
        default:
            return state;
    }
}

export default cityWeatherReducer;