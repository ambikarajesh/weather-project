import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import HourlyWeather from '../../Components/HourlyWeahter/HourlyWeather';
import DailyWeather from '../../Components/DailyWeather/DailyWeather';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/Actions/indexActionCreator';
import classes from './CityWeather.module.css';
class CityWeather extends React.Component{
    componentDidMount(){
        if(this.props.displayCity){
            this.props.fetchCityWeatherHandler(this.props.displayCity)
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(!prevProps.displayCity||(prevProps.displayCity.latitude!==this.props.displayCity.latitude && prevProps.displayCity.longitude!==this.props.displayCity.longitude)){
            this.props.fetchCityWeatherHandler(this.props.displayCity)
        }
    }

    render(){
       let header = null;
       let footer = null;
       let hourly = null;
       let daily = null;
        if(this.props.header&& this.props.footer && this.props.hourly){
            header = <Header HeaderData = {this.props.header}/>;
            footer = <Footer FooterData = {this.props.footer}/>;
            hourly = <HourlyWeather hourlyWeather = {this.props.hourly}/>
            daily  = <DailyWeather dailyWeather = {this.props.hourly}/>
                       

        }
        
        return (
            <div className = {classes.CityWeather}>
            {this.props.loading? <Spinner/>: null}
                {header}                
                {hourly}
                {daily}
                {footer}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        displayCity:state.LayoutReducer.displayCity,
        loading:state.CityWeatherReducer.loading,
        header:state.CityWeatherReducer.header,
        footer:state.CityWeatherReducer.footer,
        hourly:state.CityWeatherReducer.hourly,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchCityWeatherHandler : (city) => dispatch(actionCreators.fetchCityWeather(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityWeather);