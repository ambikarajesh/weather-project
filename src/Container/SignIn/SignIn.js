import React from 'react';
import Input from '../../Components/Input/Input';
import classes from './SignIn.module.css';
import Button from '../../Components/Button/Button';
import * as actionCreators from '../../store/Actions/indexActionCreator';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject} from '../../shared/utility';
class SignIn extends React.Component{
    state ={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'E-mail...'
                },
                value:'',
                valid:false,
                errormessage:'enter like example@gmail.com'
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password...',
                },
                value:'',
                valid:false,
                errorMessage:'6 characters: at least 1 number, 1 lower and 1 upper case letters',
                
            },
            formValid:false,
            isSignUp:true
        }
        
    }
    checkvalidity (id, value){
        switch(id){
            case 'email':
                   return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                
            case 'password':
                   return value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
            default:
                    return false;
        }
    }
    formValidity (){
        return this.state.controls['email'].valid && this.state.controls['password'].valid;        
    }
    InputChangeHandler = (event, id) => {
        
        const updateControl = updateObject(this.state.controls[id], {
            value : event.target.value,
            valid : this.checkvalidity(id, event.target.value) !== null
        })
        const updatedControls = updateObject(this.state.controls,{
            [id]:updateControl
        });
        this.setState({controls:updatedControls});
        this.setState({formValid:this.formValidity()})
    }
    SignInFormHandler = (event) =>{
        event.preventDefault();
        const signUpData = {};
        if(this.state.formValid){
            for(let key in this.state.controls){
                signUpData[key] = this.state.controls[key].value;
          }
          this.props.AuthenticationHandler(signUpData['email'], signUpData['password'], this.state.isSignUp)
        } 
    }
    SwitchHandler = () => {
            this.setState(prevState => {
                return {isSignUp:!prevState.isSignUp}
            })
    }

    render(){
        const elementsArray = [];
        for(let key in this.state.controls){
            elementsArray.push({...this.state.controls[key], id:key})
        }

        const inputElements = elementsArray.map(element =>{
            return <Input  key = {element.id} elementType = {element.elementType} elementConfig = {element.elementConfig}  valid = {element.valid} error = {element.errorMessage} value = {element.value} changed = {(event) => this.InputChangeHandler(event, element.id)}/>
        })

        let form = (
                <form onSubmit = {this.SignInFormHandler} className = {classes.SignInForm}>
                    <p>{!this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</p>
                    {inputElements}
                    <Button name = {!this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'} disable = {false} show custom = {false}/>
                </form>
        )
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className = {classes.SignIn}>
                {this.props.isAuthenticated?<Redirect to ='/'/>:null}
                {this.props.error!==null?<p style = {{color:'red', marginTop:'20px'}}>{this.props.error.message}</p>:null}
                {form}
                < Button name = {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'} clicked = {this.SwitchHandler} disable = {false} show custom = {false}/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        isAuthenticated:state.SignUporInReducer.token !== null,
        error:state.SignUporInReducer.error,
        loading:state.SignUporInReducer.loading
    }
}
const mapDispatchToProps = dispatch => {
    return{
        AuthenticationHandler : (email, password, isSignUp) => dispatch(actionCreators.signUporIn(email, password, isSignUp)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);