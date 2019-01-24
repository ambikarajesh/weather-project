import * as actionTypes from '../actionTypes';
import * as APIKeys from '../../APIkeys/APIKeys';
import axios from 'axios';
import moment from 'moment-timezone';
import tzlookup from 'tz-lookup';
export const fetchCityWeatherStart = () => {
    return {
        type:actionTypes.FETCH_CITY_WEATHER_START
    }
}
export const fetchCityWeatherSuccess = (header,footer, hourly) => {
    return{
        type:actionTypes.FETCH_CITY_WEATHER_SUCCESS,
        header:header,
        footer:footer,
        hourly:hourly
    }
}

export const fetchCityWeatherFail = () => {
    return {
        type: actionTypes.FETCH_CITY_WEATHER_FAIL
    }
}

export const fetchCityWeather = (city) => {
    return dispatch => {
        dispatch(fetchCityWeatherStart());
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${APIKeys.OpenWeatherMap}`).then(resOne =>
                {                       
                    axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.latitude}&lon=${city.longitude}&appid=${APIKeys.OpenWeatherMap}`).then(resTwo =>   
                    {
                         
                    const Header = {
                            City:resOne.data.name,
                            Description:resOne.data.weather.map((des)=>{
                                return des.main;
                            }),
                            Temp:convertKelvintoFahrenheit(resOne.data.main.temp),
                        }
                        const Footer = {
                            Sun_Rise:convertUTCDatetoCurrentTimeZoneTime(resOne.data.sys.sunrise, tzlookup(city.latitude, city.longitude)),
                            Sun_Set:convertUTCDatetoCurrentTimeZoneTime(resOne.data.sys.sunset, tzlookup(city.latitude, city.longitude)),
                            Humidity:resOne.data.main.humidity + ' %',
                            Chance_Of_Rain: findChanceOfRain(resOne.data.snow ? resOne.data.snow : 0 || resOne.data.rain ? resOne.data.rain : 0),
                            Wind_Direction:convertDegToCompass(resOne.data.wind.deg),
                            Wind_Speed:convertMpstoMph(resOne.data.wind.speed) +' mph',
                            Pressure:convertPressureHPAtoinHg(resOne.data.main.pressure) + ' inHg',
                            Precipitation:findPrecipition(resOne.data.rain ? resOne.data.rain : 0) + ' in',
                            }
                        const hourlylist = resTwo.data.list.map(list => {
                                return {
                                        time:convertUTCDatetoCurrentTimeZoneTime(list.dt, tzlookup(city.latitude, city.longitude)),
                                        day :convertUTCDatetoCurrentTimeZoneDay(list.dt, tzlookup(city.latitude, city.longitude)),
                                        temp:convertKelvintoFahrenheit(list.main.temp), 
                                        icon:list.weather[0].icon
                                }
                            })
                        dispatch(fetchCityWeatherSuccess(Header, Footer, hourlylist))
                              
                        }).catch(error =>{
                            dispatch(fetchCityWeatherFail())
                        })
                }).catch(error =>{
                    dispatch(fetchCityWeatherFail())
                })
               
    }
}


const convertUTCDatetoCurrentTimeZoneTime = (unix_timestamp, timezone) => {       
    const date = new Date(unix_timestamp * 1000).toISOString();
    const time = moment(date).tz("Europe/London").clone().tz(timezone).format('h:mm a');                
    return time    
}
const convertUTCDatetoCurrentTimeZoneDay = (unix_timestamp, timezone) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday'];
    const UTCdate = new Date(unix_timestamp * 1000).toISOString();
    const  date= moment(UTCdate).tz("Europe/London").clone().tz(timezone).format("YYYY-MM-DD");
    const day = moment(date).day();
    return days[day];  

}
const convertKelvintoFahrenheit = (Kelvin) => {
    const Fahrenheit = (9/5 *(Kelvin - 273) + 32).toFixed(0);
    return Fahrenheit;
}
const convertDegToCompass = (deg) => {
    var val = Math.floor((deg / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}
const convertMpstoMph = (mps) => {
    const mph = (Math.round(mps * 3600 / 1610.3*1000)/1000).toFixed(0);
    return mph;
}
const convertPressureHPAtoinHg = (HPA) =>{
        const inHg = (0.02952998751*HPA).toFixed(2);
        return inHg;
}
const findPrecipition = (precipitation) =>{
           return precipitation === 0 ? precipitation : precipitation['3h']  ? (precipitation['3h']* 0.0393701).toFixed(2): (precipitation['1h']*0.0393701).toFixed(2); 
}
const findChanceOfRain = (rain) => {
    return rain === 0 ? rain : rain['3h'] ? '30%': '90%';
}