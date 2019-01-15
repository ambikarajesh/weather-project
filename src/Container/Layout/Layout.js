import React from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import {Route} from 'react-router-dom';
import CityWeather from '../CityWeather/CityWeather';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/Actions/indexActionCreator';
import Spinner from '../../Components/UI/Spinner/Spinner';
class Layout extends React.Component {
    state = {
        
        showSidebar : false,
        
    }       
   
    componentDidMount(){
        this.props.fetchCurrentCityHandler();  
        this.props.fetchCitiesHandler();       
    }   
    

    render(){
        let City = this.props.loading ? <Spinner/> : this.props.error ? <p>{this.props.error}</p> : this.props.currentCity ? <Route path = '/' component = {() => <CityWeather city = {this.props.displayCity}/>}/> : null;
        
        return(
            <React.Fragment>
                <Toolbar clickToggleButton = {this.props.toggleButtonHandler}/>
                <Sidebar    error = {this.props.error}
                            loading = {this.props.loading}
                            showSidebar = {this.props.showSidebar} 
                            showAddCity = {this.props.showAddCity}
                            clickAddButton = {this.props.addButtonHandler}
                            clickCancelButton = {this.props.cancelButtonHandler}
                            clickAddCityButton = {this.props.addCityHandler}
                            clickDeleteButton = {this.props.deleteCityHandler}
                            clickCity = {this.props.selectCityHandler}/>
                

                <main>
                   {City}
                </main>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        cityList:state.LayoutReducer.cityList,
        currentCity:state.LayoutReducer.currentCity,
        displayCity:state.LayoutReducer.displayCity,
        showAddCity:state.LayoutReducer.showAddCity,
        showSidebar:state.LayoutReducer.showSidebar,
        loading:state.LayoutReducer.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchCurrentCityHandler : () => dispatch(actionCreators.fetchCurrentCity()),
        fetchCitiesHandler : () => dispatch(actionCreators.fetchCities()),
        toggleButtonHandler: () => dispatch(actionCreators.toggleButton()),
        addCityHandler : (newCity) => dispatch(actionCreators.addCity(newCity)),
        deleteCityHandler : (delCity) => dispatch(actionCreators.deleteCity(delCity)),        
        addButtonHandler : () => dispatch(actionCreators.addButton()),
        cancelButtonHandler: () => dispatch(actionCreators.cancelButton()),
        selectCityHandler: (selCity) => dispatch(actionCreators.selectCity(selCity))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);