import * as actionTypes from '../actionTypes';
import {updateObject} from '../utility';
const initialState = {
    cities:[],
    loading:false
}

const fetchcities = (state, action) => {
    const cities = state.cities;
    return updateObject(state, {cities:cities.concat(action.city), loading:false})
}
const moreCitiesReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_MORECITIES_WEATHER_START: return updateObject(state, {cities:[], loading:true});        
        case actionTypes.FETCH_MORECITIES_WEATHER_SUCCESS: return fetchcities(state, action);        
        case actionTypes.FETCH_MORECITIES_WEATHER_FAIL: return updateObject(state, {loading:false});
        default:
            return state;
    }
}

export default moreCitiesReducer;