import React from 'react';

import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import history from '../../history';
import { Button } from 'react-bootstrap';

class GoogleAuth extends React.Component{

    constructor(){
        super()
        this.state = {
            isSignedIn: null
        }
    }


    componentDidMount(){
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId: '821046768913-3qo7vh7grds2e59ncpbus8chjdhv9n8g.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance(); 
            })
        })
    }


    async logIn(){
        await this.auth.signIn();
        const user = this.auth.currentUser.get().getBasicProfile();
        this.props.signIn(user.getId(), "google", user.getName());
        history.push('/home');
    }

    async logOut(){
        await this.auth.signOut();
        this.props.signOut();
        history.push('/');
    }

    renderAuthButton(){
        if(this.props.isSignedIn){
            return <Button 
                        variant="danger"
                        onClick={() => this.logOut()}
                    >
                        Sign out
                    </Button>
        } else{
            return <Button 
                        variant="primary"
                        onClick={() => this.logIn()}
                    >
                        Sign in
                    </Button>
        }
    }

    render(){
        return this.renderAuthButton();
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);