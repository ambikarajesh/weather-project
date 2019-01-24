import * as actionTypes from '../actionTypes';
import * as APIKeys from '../../APIkeys/APIKeys';
import axios from 'axios';
import moment from 'moment-timezone';
import tzlookup from 'tz-lookup';
export const fetchMoreCitiesWeatherStart = () => {
    return {
        type:actionTypes.FETCH_MORECITIES_WEATHER_START,
    }
}
export const fetchMoreCitiesWeatherSuccess = (city) => {
    return{
        type:actionTypes.FETCH_MORECITIES_WEATHER_SUCCESS,
        city:city
    }
}

export const fetchMoreCitiesWeatherFail = () => {
    return {
        type: actionTypes.FETCH_MORECITIES_WEATHER_FAIL
    }
}

export const fetchMoreCitiesWeather = (cityList) => {
    return dispatch => {       
        dispatch(fetchMoreCitiesWeatherStart());        
        cityList.forEach(city =>{
            axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${APIKeys.OpenWeatherMap}`).then(res =>
                    {   
                        const data = {
                                latitude:city.latitude,
                                longitude:city.longitude,
                                id:city.id,
                                name:res.data.name,                                        
                                temp:convertKelvintoFahrenheit(res.data.main.temp),
                                time:convertUTCDatetoCurrentTimeZoneTime(res.data.dt, tzlookup(city.latitude,city.longitude))
                            };
                            dispatch(fetchMoreCitiesWeatherSuccess(data));                                                                    
                    }).catch(error =>{
                        dispatch(fetchMoreCitiesWeatherFail());
                    })
        })       
        
    }
}

const convertKelvintoFahrenheit = (Kelvin) => {
    const Fahrenheit = (9/5 *(Kelvin - 273) + 32).toFixed(0);
    return Fahrenheit;
}
const convertUTCDatetoCurrentTimeZoneTime = (unix_timestamp, timezone) => {
    const date = new Date(unix_timestamp * 1000).toISOString();
    const time = moment(date).tz("Europe/London").clone().tz(timezone).format('h:m a');          
    return time;
}