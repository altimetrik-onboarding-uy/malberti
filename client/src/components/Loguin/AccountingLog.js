import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import  history  from '../../history';
import { signIn } from '../../actions';
import sv from '../../api/savings';

class AccountingLog extends React.Component{

    constructor(){
        super()
        this.state = {
            user: '',
            password: '',
            error:''
        }
    }

    async logIn(userName, password){

        await sv.get(`/users/${userName}`)
        .then(user => {
            if(user.data.password === password){
                this.props.signIn(user.data.userId, "account", user.data.user);
                history.push('/home');
            }
            else{
               this.setState({error: 'Wrong password, please try again'})
            }
        }).catch( err => {
            this.setState({error: `User does not exist, please try again`})
        })

    }


    renderInputs(){
        return(
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"> &nbsp; &nbsp; User  &nbsp; &nbsp;</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder= "Enter your username"
                    aria-label="User"
                    aria-describedby="basic-addon1"
                    onChange={(evt) => this.setState({ user: evt.target.value })}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder= "In how many months would you like to save?"
                    type="password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={(evt) => this.setState({ password: evt.target.value })}
                />
                </InputGroup>
            </div>
        )
    }

    render(){
        return(
            <div>
                AccountingLog
                {this.state.error ? <p>{this.state.error}</p> : <></>}
                {this.renderInputs()}
                <Button variant="primary" onClick={() => this.logIn(this.state.user, this.state.password)}>Log In</Button>
            </div>
        )
    }
}

export default connect(null, { signIn } )(AccountingLog);