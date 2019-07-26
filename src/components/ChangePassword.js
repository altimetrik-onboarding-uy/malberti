import React from 'react';

import {connect} from 'react-redux';

import { Form, Button } from 'react-bootstrap';

import { actUser } from '../actions'

class ChangePassword extends React.Component {

    constructor(){
        super()
        this.state = {
            newPassword: '',
            newPasswordConfirm: '',
            error: '',
            message: ''
        }
    }

    change(event){
        event.preventDefault();

        if(this.state.newPassword !== '' && this.state.newPasswordConfirm !== ''){
            if(this.state.newPassword ===  this.state.newPasswordConfirm){
                const list = this.props.list;
                let logged = this.props.logged;
    
                let found = false;
                let i = 0;
                while(i < list.length && !found){
                    if(logged.user === list[i].user){
                        found = true;
                    }else{
                        i++;
                    }
                }
                if(found){
                    logged.password = this.state.newPassword;
                    this.setState({
                        error: '',
                        message: 'Password changed successfully!'
                    })                   
                    this.props.actUser(logged)
                }
            }else{
                this.setState({
                    error: `The passwords don't match`,
                    message: ''
                })
            }
        }else{
            this.setState({
                error: 'Please fill all the inputs!',
                message: ''
            })
        }
    }

    render(){
        return(
            <section className="container"> 
                <div className="row">
                    <Form className="col-lg-8 col-md-10 mx-auto my-5">
                        <Form.Group controlId="formCreatePassword">
                            <Form.Label>New password: </Form.Label>
                            <Form.Control type="password" placeholder="Enter new Password" onChange={(event) => this.setState({ newPassword: event.target.value })}/>
                        </Form.Group>
                        <Form.Group controlId="formControlPassword">
                            <Form.Label>Confirm password: </Form.Label>
                            <Form.Control type="password" placeholder="Confirm new Password" onChange={(event) => this.setState({ newPasswordConfirm: event.target.value })}/>
                        </Form.Group>
                        <Button variant="success" onClick={(event)=> this.change(event)}>
                            Change Password
                        </Button>
                        {this.state.message ? <p className="text-success d-inline mx-3">{this.state.message}</p> : <div className="d-inline"></div>}
                        {this.state.error ? <p className="text-danger d-inline mx-3">{this.state.error}</p> : <div className="d-inline"></div>}
                    </Form>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state){
    return{
        list: state.users,
        logged: state.loggedUser
    }
}

export default connect(mapStateToProps, { actUser })(ChangePassword);