import React from 'react';
import { connect } from 'react-redux';

import {Form, Button} from 'react-bootstrap';

import { createAccount } from '../actions';

class CreateAccount extends React.Component{

    constructor(){
        super()
        this.state = {
            newUser: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    register(event){
        event.preventDefault()
        if(this.state.newUser !== '' && this.state.newPassword !== '' && this.state.confirmPassword !== ''){
            
            let existe = false;
            let i = 0;

            while(!existe && i < this.props.users.length){
                if(this.state.newUser === this.props.users[i].user){
                    existe = true;
                }
                else{
                    i++;
                }
            }
            if(!existe){
                if(this.state.newPassword === this.state.confirmPassword){
                    this.props.register(this.state.newUser, this.state.newPassword);
                    this.props.message('The account was made successfully!')
                    this.props.close();
                }
                else{
                    this.props.error(`The passwords don't match, please try again!`)
                }
            }
            else{
                this.props.error(`This username already exists! Try a different one!`)
            }
        }
        else{
            this.props.error(`Please, fill all the inputs!`)
        }
    }

    render(){
        return(
            <Form>
                <Form.Group controlId="formCreateUser">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={(event) => this.setState({ newUser: event.target.value })}/>
                </Form.Group>
                <Form.Group controlId="formCreatePassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onChange={(event) => this.setState({ newPassword: event.target.value })}/>
                </Form.Group>
                <Form.Group controlId="formControlPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" onChange={(event) => this.setState({ confirmPassword: event.target.value })}/>
                </Form.Group>
                <Button variant="success" onClick={(event) => this.register(event)}>
                    Create account
                </Button>
            </Form>
        )
    }
}

function mapStateToProps(state){
    return{
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user, password) => {
            dispatch(createAccount(user, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)