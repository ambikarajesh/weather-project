import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import layoutReducer from './store/Reducers/layoutReducer';
import currentCityReducer from './store/Reducers/currentCityReducer';
import moreCitiesReducer from './store/Reducers/moreCitiesReducer';
import cityWeatherReducer from './store/Reducers/cityWeatherReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    LayoutReducer:layoutReducer,
    CurrentCityReducer: currentCityReducer,
    MoreCitiesReducer:moreCitiesReducer,
    CityWeatherReducer:cityWeatherReducer,
})
const logger = ()=>{
    return next =>{
        return action =>{
            //console.log('MIDDLEWARE dispatch:', action);
            const result = next(action);
            //console.log('NEXT STATE:', store.getState());
            return result;
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>    
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
