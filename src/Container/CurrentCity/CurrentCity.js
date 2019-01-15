import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/Actions/indexActionCreator';
import NavItems from '../../Components/Sidebar/NavItems/NavItems';
class CurrentCity extends React.Component{
    componentDidUpdate(prevProps, prevState){
        if(!prevProps.currentCity||(prevProps.currentCity.latitude!==this.props.currentCity.latitude && prevProps.currentCity.longitude!==this.props.currentCity.longitude)){
            this.props.fetchCurrentCityWeatherHandler(this.props.currentCity)
        }
    }
    render(){
        const current  = this.props.city ? <NavItems cities = {this.props.city} show = {false}  clickCity = {this.props.clickCity}/> :null;
        return(
            <div> 
               {current}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentCity:state.LayoutReducer.currentCity,
        city:state.CurrentCityReducer.city
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchCurrentCityWeatherHandler : (city) => dispatch(actionCreators.fetchCurrentCityWeather(city))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCity);