import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './SearchLocation.css';
import Button from '../../Components/Button/Button';
import classes from './SearchLocation.module.css';
import {connect} from 'react-redux';
class SearchLocation extends React.Component {
      state = { 
          address: '',
          longitude : null,
          latitude:null,
          disableAddButton:true,
      };


      handleChange = address => {
          this.setState({ address:address });
      };

      handleSelect = address => {
          geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
                this.setState({address:address, longitude:latLng.lng, latitude:latLng.lat, disableAddButton:false})
          })
          .catch(error => console.error('Error', error));
      };

 
      render() {
            //console.log(this.state)


            const render = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                      <input
                                            {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className: 'location-search-input',
                                            })}
                                      />
                                      <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                                            const className = suggestion.active ? 'suggestion-item--active': 'suggestion-item';
                                                                            // inline style for demonstration purpose
                                                                            const style = suggestion.active ? { backgroundColor:'#ccc', color: '#000', cursor: 'pointer' } : { backgroundColor: '#000', cursor: 'pointer' };
                                                                            return (
                                                                                <div
                                                                                      {...getSuggestionItemProps(suggestion, {
                                                                                                                            className,
                                                                                                                            style,
                                                                                                                })
                                                                                      }
                                                                                      >
                                                                                      <span>{suggestion.description}</span>
                                                                                </div>
                                                                            );
                                                              })
                                            }
                                      </div>
                                </div>
                            )
            
                  
            
                  return (
                          <div className = {classes.SearchLocation}>
                                <p>Enter the city where do you want to know the current weather...</p> 
                                <PlacesAutocomplete
                                                  value={this.state.address}
                                                  onChange={this.handleChange}
                                                  onSelect={this.handleSelect}
                                >
                                              {render}
                                </PlacesAutocomplete>
                                <Button name ='ADD' clicked = {() => this.props.clickAddCityButton({latitude:this.state.latitude.toFixed(2), longitude:this.state.longitude.toFixed(2), userId:this.props.userId})} disable = {this.state.disableAddButton} show custom = {false}/>
                                <Button name ='CANCEL'  clicked = {this.props.clickCancelButton} disable = {false} show custom = {false}/>

                          </div>

            );
      }
}
const mapStatetoProps = state => {
      return{
            userId:state.SignUporInReducer.userId
      }
}

export default connect(mapStatetoProps)(SearchLocation);