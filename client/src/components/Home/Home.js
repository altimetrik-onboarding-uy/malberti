import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchSavings } from '../../actions';
import GoogleAuth from '../Loguin/GoogleAuth';
import PersonalDashboard from './PersonalDashboard';
import AccountingDashboard from './AccountingDashboard';
import NewSaving from './NewSaving';

class Home extends React.Component{

    constructor(){
        super()
        this.state = {
            message: ""
        }
    }

    componentDidMount(){
        this.props.fetchSavings(this.props.user.userId);
    }

    renderMain(){
        let encontrado = false;
        let userSaving = null;
        let i = 0;

        while(!encontrado && i < this.props.savings.length){
            if(this.props.savings[i].userId === this.props.user.userId){
                userSaving = this.props.savings[i];
                encontrado = true;
            }else{
                i++;
            }
        }
        if(encontrado){
            return <PersonalDashboard userSaving={userSaving} sendMessage={this.sendMessage.bind(this)} />;
        }else{
            return <NewSaving sendMessage={this.sendMessage.bind(this)} />;
        }
    }

    sendMessage(message){
        this.setState({ message })
    }

    render(){
        if(this.props.user.isSignedIn){
            return(
                <main>
                    <section className="container">
                        <div className="row">            
                            <Card className="col-lg-8 col-md-10 col-12 mx-auto my-5">
                                <Card.Body>
                                    <div className="row">
                                        <div className="col-12">
                                            <h1 className="display-4">
                                                { this.props.user.origin === "account" ? "Accounting Dashboard" : "Personal Dashboard"}
                                            </h1>
                                            { this.state.message ? <p className="text-danger">{this.state.message}</p> : <></>}
                                            { this.props.user.origin === "account" ? <AccountingDashboard /> : this.renderMain()}
                                        </div>
                                    </div>
                                    <div className="row justify-content-end">
                                        <GoogleAuth/>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </section>
                </main>
            )
        }else{
            return <Redirect to='/'/>
        }
    }
}

const mapStateToProps = (state) =>{
    return({
        user: state.auth,
        savings: state.savings
    })
}

export default connect(mapStateToProps, { fetchSavings })(Home);