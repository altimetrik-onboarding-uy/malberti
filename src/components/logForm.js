import React from 'react';

import { connect } from 'react-redux';
import { logIn } from '../actions';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LogForm extends React.Component{

    constructor(){
        super()
        this.state = {
            user: '',
            password: ''
        }
    }

    log(event){
        event.preventDefault();

        if(this.state.user !== '' && this.state.password !== ''){
            this.props.userList.forEach(el => {
                if(el.user === this.state.user && el.password === this.state.password){
                    this.props.error('')
                    this.props.logIn(el);
                }else{
                    this.props.error('Wrong user or password. Please, try again.')
                }
            })
        }else{
            this.props.error('Please fill all the inputs!')
        }
    }

    render(){
        return(
            <Form>
                <Form.Group controlId="formUser">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={(event) => this.setState({ user: event.target.value })}/>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })}/>
                </Form.Group>
                <Button variant="success" onClick={(e) => this.log(e)}>
                    Log in
                </Button>
            </Form>
        )
    }
}

function mapStateToProps(state){
    return{
        userList: state.users,
        log: state.logged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (user, password) => {
            dispatch(logIn(user, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogForm);