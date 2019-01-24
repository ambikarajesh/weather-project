import React, { Component } from 'react';
import './App.css';
import Layout from './Container/Layout/Layout';
import CityWeather from './Container/CityWeather/CityWeather';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Logout from './Container/Logout/Logout';
import {connect} from 'react-redux';
import * as actionCreators from './store/Actions/indexActionCreator';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncSignUp = asyncComponent(()=>{
  return import('./Container/SignIn/SignIn');
})
class App extends Component {
  componentDidMount(){
      this.props.RetainStateHandler();
  }
  render(){
    return(
      <div className = 'App'>
            
      <Layout>
        <Switch>
            <Route path = '/'  exact component = {CityWeather}/>
            <Route path = '/signin' component = {asyncSignUp}/>
            <Route path = '/logout' component = {Logout}/>
            <Redirect to = '/'/>
        </Switch>
      </Layout>
         
      </div>
      
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    RetainStateHandler : () => dispatch(actionCreators.retainState())
  }
}
export default withRouter(connect(null, mapDispatchToProps)(App));
