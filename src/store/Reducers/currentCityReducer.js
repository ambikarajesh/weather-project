import * as actionTypes from '../actionTypes';
import {updateObject} from '../utility';
const initialState = {
    city:null,
    loading:false
}

const currentCityReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_CURRENTCITY_WEATHER_START: return updateObject(state, {loading:true});           
        case actionTypes.FETCH_CURRENTCITY_WEATHER_SUCCESS:return updateObject(state, {city:[action.city], loading:false}); 
        case actionTypes.FETCH_CURRENTCITY_WEATHER_FAIL:return updateObject(state, {loading:false});             
        default:
            return state;
    }
}

export default currentCityReducer;