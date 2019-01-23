import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/Actions/indexActionCreator';
class Logout extends React.Component{  
    componentDidMount(){
        this.props.LogoutHandler();
    }  
    render(){        
        return <Redirect to ='/'/>
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        LogoutHandler : () => dispatch(actionCreators.logout())
    }
}


export default connect(null, mapDispatchToProps)(Logout);