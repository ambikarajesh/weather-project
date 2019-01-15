import * as actionTypes from '../actionTypes';
const initialState = {
    cities:[],
    loading:false
}

const moreCitiesReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_MORECITIES_WEATHER_START:
            return{
                ...state,
                cities:[],
                loading:true,
            }
        case actionTypes.FETCH_MORECITIES_WEATHER_SUCCESS:
        const cities = state.cities
            return{
                ...state,
                cities:cities.concat(action.city),
                loading:false
            }
        case actionTypes.FETCH_MORECITIES_WEATHER_FAIL:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default moreCitiesReducer;