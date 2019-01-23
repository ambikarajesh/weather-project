import React from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/Actions/indexActionCreator';
class Layout extends React.Component {
   
    componentDidMount(){
        this.props.fetchCurrentCityHandler(); 
    }  
    componentDidUpdate(prevProps, prevState){
        if(!prevProps.token && this.props.token){              
                this.props.fetchCitiesHandler();      
        }
    } 
    

    render(){
        return(
            <React.Fragment>
                <Toolbar clickToggleButton = {this.props.toggleButtonHandler} isAuthenticated = {this.props.isAuthenticated}/>
                <Sidebar    loading = {this.props.loading}
                            showSidebar = {this.props.showSidebar} 
                            showAddCity = {this.props.showAddCity}
                            isAuthenticated = {this.props.isAuthenticated}
                            clickAddButton = {()=>this.props.addButtonHandler(this.props.isAuthenticated)}
                            clickCancelButton = {this.props.cancelButtonHandler}
                            clickAddCityButton = {this.props.addCityHandler}
                            clickDeleteButton = {this.props.deleteCityHandler}
                            clickCity = {this.props.selectCityHandler}/>
                

                <main>
                {this.props.children}
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
        loading:state.LayoutReducer.loading,
        isAuthenticated :state.SignUporInReducer.token !== null,
        token:state.SignUporInReducer.token
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchCurrentCityHandler : () => dispatch(actionCreators.fetchCurrentCity()),
        fetchCitiesHandler : () => dispatch(actionCreators.fetchCities()),
        toggleButtonHandler: () => dispatch(actionCreators.toggleButton()),
        addCityHandler : (newCity) => dispatch(actionCreators.addCity(newCity)),
        deleteCityHandler : (delCity) => dispatch(actionCreators.deleteCity(delCity)),        
        addButtonHandler : (isAuth) => dispatch(actionCreators.addorSignInButton(isAuth)),
        cancelButtonHandler: () => dispatch(actionCreators.cancelButton()),
        selectCityHandler: (selCity) => dispatch(actionCreators.selectCity(selCity))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);