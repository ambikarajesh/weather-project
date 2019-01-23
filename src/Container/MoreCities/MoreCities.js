import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/Actions/indexActionCreator';
import NavItems from '../../Components/Sidebar/NavItems/NavItems';

class MoreCities extends React.Component{
    componentDidUpdate(nextProps, nextState){
        if(nextProps.cityList.length!==this.props.cityList.length){
            this.props.fetchMoreCitiesWeatherHandler(this.props.cityList)
        }
    }
   
    render(){
       const morecities  = this.props.cities.length>=0? <NavItems cities = {this.props.cities} clickDeleteButton = {this.props.clickDeleteButton}  clickCity = {this.props.clickCity} show/> :null;
        return(
            <div> 
               {morecities}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cityList:state.LayoutReducer.cityList,
        cities:state.MoreCitiesReducer.cities
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchMoreCitiesWeatherHandler : (city) => dispatch(actionCreators.fetchMoreCitiesWeather(city))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MoreCities);