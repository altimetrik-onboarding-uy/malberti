import React from 'react';

import { connect } from 'react-redux';

import LoginPanel from './logPanel';
import Home from './Home';


class App extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            isLogged: this.props.logged
        }
    }

    logPanel(){
        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col-6 mx-auto">
                        <LoginPanel/>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.props.logged ? <Home/> : this.logPanel()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        logged: state.loggedUser
    }
}

export default connect(mapStateToProps)(App);