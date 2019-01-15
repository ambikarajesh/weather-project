import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import HourlyWeather from '../../Components/HourlyWeahter/HourlyWeather';
import DailyWeather from '../../Components/DailyWeather/DailyWeather';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/Actions/indexActionCreator';
class CityWeather extends React.Component{
    componentDidMount(){        
            this.props.fetchCityWeatherHandler(this.props.city)
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
            <div>
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