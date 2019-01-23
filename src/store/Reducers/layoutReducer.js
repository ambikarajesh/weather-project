import * as actionTypes from '../actionTypes';
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
        case actionTypes.FETCH_CURRENTCITY_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_CURRENTCITY_SUCCESS:
            return{
                ...state,
                currentCity:action.currentCity,
                displayCity:action.currentCity,
                loading:false,
            }
        case actionTypes.FETCH_CURRENTCITY_FAIL:
            return{
                ...state,
            }


        case actionTypes.FETCH_CITIES_START:
            return{
                ...state,
                cityList:[],
                loading:true,
            }
        case actionTypes.FETCH_CITIES_SUCCESS:
            return{
                ...state,
                cityList:action.cities,
                loading:false,
            }
        case actionTypes.FETCH_CITIES_FAIL:
            return{
                ...state,     
            }
        
        
        case actionTypes.TOGGLE_BUTTON:
            let showSidebar = state.showSidebar;
            return{
                ...state,
                showSidebar:!showSidebar,
            }

        case actionTypes.SELECT_CITY:
            return{
                ...state,
                displayCity:action.selCity,
                showSidebar:false,

            }


        case actionTypes.ADD_CITY_START:
                return{
                    ...state,
                    loading:true,                    
                    showAddCity:false
                }
        case actionTypes.ADD_CITY_SUCCESS:
            return{
                ...state, 
                loading:false,              
            }
        case actionTypes.ADD_CITY_FAIL:
            return{
                ...state,
                loading:false
            }


        case actionTypes.DELETE_CITY_START:
            return{
                ...state, 
                loading:true
            }
        case actionTypes.DELETE_CITY_SUCCESS:
            return{
                ...state,    
                displayCity:state.currentCity, 
                loading:false          
            }
        case actionTypes.DELETE_CITY_FAIL:
            return{
                ...state,
                loading:false
            }

        
        case actionTypes.ADD_BUTTON:
            return{
                ...state,
                showAddCity:true
            }
        case actionTypes.CANCEL_BUTTON:
            return{
                ...state,
                showAddCity:false
            }
        case actionTypes.CLEAR_CITIES:
            return{
                ...state,
                cityList :[]
            } 
        case actionTypes.OPEN_SIGNIN:
            return{
                ...state,
                showSidebar:false
            }   

        default:
            return state
    }
} 

export default layoutReducer;