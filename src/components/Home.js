import React from 'react';

import { connect } from 'react-redux';

import Navigation from './Navigation';
import HomeBody from './HomeBody';
import ChangePassword from './ChangePassword';
import UserAdministration from './UserAdministration';

class Home extends React.Component{

    constructor(){
        super()
        this.state = {
            homeState: ''
        }
    }

    changePassword(){
        this.setState({
            homeState: 'passwordChange'
        })
    }

    userAdmin(){
        this.setState({
            homeState: 'userAdmin'
        })
    }

    seeHome(){
        this.setState({
            homeState: 'home'
        })
    }

    changePanel(){
        switch(this.state.homeState){
            case 'passwordChange':
                return <ChangePassword/> 
            case 'userAdmin':
                return <UserAdministration/>
            default:
                return <HomeBody/>
        }
    }

    render(){
        return(
            <div>
                <Navigation 
                    showPasswordForm={this.changePassword.bind(this)}
                    showHome={this.seeHome.bind(this)}
                    showAdmin={this.userAdmin.bind(this)}
                    user={this.props.logged.user}
                    homeState={this.state.homeState}
                />
                {this.changePanel()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        logged: state.loggedUser,
        posts: state.posts
    }
}

export default connect(mapStateToProps)(Home);