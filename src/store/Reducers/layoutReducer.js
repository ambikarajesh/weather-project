import * as actionTypes from '../actionTypes';
import {updateObject} from '../utility';
const initialState = {
    cityList:[],
    currentCity:null,
    displayCity:null,
    showAddCity:false,
    showSidebar:false,
    loading:false,
}

const layoutReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.FETCH_CURRENTCITY_START: return updateObject(state, {loading:true});           
        case actionTypes.FETCH_CURRENTCITY_SUCCESS: return updateObject(state, {currentCity:action.currentCity, displayCity:action.currentCity, loading:false});           
        case actionTypes.FETCH_CURRENTCITY_FAIL: return updateObject(state, {loading:false});           
        case actionTypes.FETCH_CITIES_START:return updateObject(state, {cityList:[], loading:true});           
        case actionTypes.FETCH_CITIES_SUCCESS: return updateObject(state,{cityList:action.cities, loading:false});            
        case actionTypes.FETCH_CITIES_FAIL: return updateObject(state, {loading:false});
        case actionTypes.TOGGLE_BUTTON: return updateObject(state, {showSidebar:!state.showSidebar});
        case actionTypes.SELECT_CITY: return updateObject(state, {displayCity:action.selCity, showSidebar:false,})
        case actionTypes.ADD_CITY_START: return updateObject(state, {loading:true, showAddCity:false});            
        case actionTypes.ADD_CITY_SUCCESS: return updateObject(state, {loading:false});         
        case actionTypes.ADD_CITY_FAIL:return updateObject(state, {loading:false});
        case actionTypes.DELETE_CITY_START:  return updateObject(state, {loading:true});           
        case actionTypes.DELETE_CITY_SUCCESS: return updateObject(state, {displayCity:state.currentCity, loading:false});
        case actionTypes.DELETE_CITY_FAIL:return updateObject(state, {loading:false});
        case actionTypes.ADD_BUTTON: return updateObject(state, {showAddCity:true});
        case actionTypes.CANCEL_BUTTON: return updateObject(state, {showAddCity:false});
        case actionTypes.CLEAR_CITIES: return updateObject(state, {cityList:[], displayCity:state.currentCity});           
        case actionTypes.OPEN_SIGNIN: return updateObject(state, {showSidebar:false});
        default:
            return state
    }
} 

export default layoutReducer;