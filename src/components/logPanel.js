import React from 'react';

import Card from 'react-bootstrap/Card';

import LogForm from './logForm';
import CreateAccount from './CreateAccount';
import Button from 'react-bootstrap/Button';

class LoginPanel extends React.Component{

    constructor(){
        super()
        this.state ={
            register: false,
            error: '',
            message: ''
        }
    }

    toggleRegister(){
        this.setState({
            register: !this.state.register,
            error: ''
        })
    }

    sendMessage(message){
        this.setState({
            message
        })
    }

    sendError(error){
        this.setState({
            error
        })
    }

    render(){
        return(
            <Card className="bg-dark text-white text-center">
                <Card.Header>
                    <Card.Title>Welcome to Loggy</Card.Title>
                    <Card.Text>
                        If you want to see some cool pictures provided by Unsplash, log in with your username and password.
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    {this.state.register ?
                        <CreateAccount 
                            close={this.toggleRegister.bind(this)}
                            error={this.sendError.bind(this)}
                            message={this.sendMessage.bind(this)}
                        /> 
                        : 
                        <LogForm 
                            error={this.sendError.bind(this)}
                        />
                    }
                </Card.Body>
                <Card.Footer className="text-muted">
                    {this.state.message ? <p className="text-success">{this.state.message}</p> : <div></div>}
                    {this.state.error ? <p className="text-danger">{this.state.error}</p> : <div></div>}
                    {this.state.register ? 
                        <Button variant="outline-danger" onClick={() => this.toggleRegister()}>Cancel</Button>
                        : 
                        <Button variant="outline-info"
                            onClick={() => {
                                this.toggleRegister()
                                this.setState({message: ''})}
                            }
                        >Register</Button> 
                    }
                </Card.Footer>
            </Card>
        )
    }
}

export default LoginPanel;