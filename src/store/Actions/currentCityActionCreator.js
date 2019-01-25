import * as actionTypes from '../actionTypes';
import * as APIKeys from '../../APIkeys/APIKeys';
import axios from 'axios';
import moment from 'moment-timezone';
import tzlookup from 'tz-lookup';
export const fetchCurrentCityWeatherStart = () => {
    return {
        type:actionTypes.FETCH_CURRENTCITY_WEATHER_START
    }
}
export const fetchCurrentCityWeatherSuccess = (city) => {
    return{
        type:actionTypes.FETCH_CURRENTCITY_WEATHER_SUCCESS,
        city:city
    }
}

export const fetchCurrentCityWeatherFail = () => {
    return {
        type: actionTypes.FETCH_CURRENTCITY_WEATHER_FAIL
    }
}

export const fetchCurrentCityWeather = (city) => {
    return dispatch => {
        dispatch(fetchCurrentCityWeatherStart());
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${APIKeys.OpenWeatherMap}`).then(res =>
                    {   
                        const curCity = {
                                latitude:city.latitude,
                                longitude:city.longitude,
                                id: new Date(),
                                name:res.data.name,                                        
                                temp:convertKelvintoFahrenheit(res.data.main.temp),
                                time:convertUTCDatetoCurrentTimeZoneTime(res.data.dt, tzlookup(city.latitude,city.longitude))
                            };
                        dispatch(fetchCurrentCityWeatherSuccess(curCity))
                                                                    
                    }).catch(error =>{
                        dispatch(fetchCurrentCityWeatherFail());
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