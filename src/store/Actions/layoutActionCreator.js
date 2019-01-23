import * as actionTypes from '../actionTypes';
import axios from 'axios';
export const fetchCurrentCityStart = () => {
    return {
        type:actionTypes.FETCH_CURRENTCITY_START
    }
}
export const fetchCurrentCitySuccess = (city) => {
    return{
        type:actionTypes.FETCH_CURRENTCITY_SUCCESS,
        currentCity:city
    }
}

export const fetchCurrentCityFail = () => {
    return {
        type: actionTypes.FETCH_CURRENTCITY_FAIL
    }
}

export const fetchCurrentCity = () => {
    return dispatch =>{
        dispatch(fetchCurrentCityStart());
        if (navigator.geolocation) {           
            navigator.geolocation.getCurrentPosition((position)=>{
                const currentCity = {latitude : position.coords.latitude.toFixed(2),
                                    longitude : position.coords.longitude.toFixed(2)
                                    }
                dispatch(fetchCurrentCitySuccess(currentCity));     
            });           
        }
        else{
                console.log('Turn on location access in your device')
                dispatch(fetchCurrentCityFail())
        }
    }
}


export const fetchCitiesStart = () => {
    return {
        type:actionTypes.FETCH_CITIES_START
    }
}
export const fetchCitiesSuccess = (cities) => {
    return{
        type:actionTypes.FETCH_CITIES_SUCCESS,
        cities:cities
    }
}

export const fetchCitiesFail = () => {
    return {
        type: actionTypes.FETCH_CITIES_FAIL
    }
}

export const fetchCities = () => {
    return (dispatch, getState)=>{
        const token = getState().SignUporInReducer.token;
        const userId = getState().SignUporInReducer.userId;  
        dispatch(fetchCitiesStart());        
        axios.get('https://weather-project-224801.firebaseio.com/citylist.json', {
            params: {
                auth: token,
                orderBy: '"userId"',
                equalTo: `"${userId}"`,
            }}).then(res =>{
            const cities = [];
            for (let key in res.data){
                cities.push({...res.data[key], id:key});
            }
            dispatch(fetchCitiesSuccess(cities))
        }).catch(error =>{
            console.log(error);
            dispatch(fetchCitiesFail())
        })
    }
}


export const toggleButton = () => {
    return{
        type:actionTypes.TOGGLE_BUTTON,
    }
}


export const addCityStart = () => {
    return {
        type:actionTypes.ADD_CITY_START
    }
}
export const addCitySuccess = () => {
    return{
        type:actionTypes.ADD_CITY_START
    }
}

export const addCityFail = () => {
    return {
        type: actionTypes.ADD_CITY_FAIL
    }
}

export const addCity = (newCity) => {
    return (dispatch, getState)=>{
        const token = getState().SignUporInReducer.token;        
        dispatch(addCityStart());
        axios.post('https://weather-project-224801.firebaseio.com/citylist.json?auth='+token, newCity).then(response =>{
            dispatch(addCitySuccess())
           dispatch(fetchCities())
        }).catch(error =>{
            console.log(error)
            dispatch(addCityFail())
        })
    }
}

export const deleteCityStart = () => {
    return {
        type:actionTypes.DELETE_CITY_START
    }
}
export const deleteCitySuccess = () => {
    return{
        type:actionTypes.DELETE_CITY_START
    }
}

export const deleteCityFail = () => {
    return {
        type: actionTypes.DELETE_CITY_FAIL
    }
}

export const deleteCity = (delCity) => {
    return (dispatch, getState)=>{
        const token = getState().SignUporInReducer.token;
        dispatch(deleteCityStart());
        axios.delete('https://weather-project-224801.firebaseio.com/citylist/'+delCity.id+'.json?auth='+token).then(response =>{
           dispatch(deleteCitySuccess())
           dispatch(fetchCities())
        }).catch(error =>{
            console.log(error)
            dispatch(deleteCityFail())
        })
    }
}

export const selectCity = (city) => {
    return{
        type:actionTypes.SELECT_CITY,
        selCity:city
    }
}

export const addButton = () => {
    return{
        type:actionTypes.ADD_BUTTON
    }
}

export const cancelButton = () => {
    return{
        type:actionTypes.CANCEL_BUTTON
    }
}





