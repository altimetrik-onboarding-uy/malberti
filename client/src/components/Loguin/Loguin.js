import React from 'react';

import { Card } from 'react-bootstrap'

import GoogleAuth from './GoogleAuth';
import AccountingLog from './AccountingLog';

class Loguin extends React.Component{
    
    render(){
        return(
            <main className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-12 mx-auto text-center">

                    <Card className="my-5">
                        <Card.Body>
                            <h1 className="display-3">Welcome to Alti-Save</h1>
                            <h3 className="lead">Earn. Save. Rise!</h3>
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <AccountingLog />
                                </div>
                                <div className="col-md-6">
                                    <GoogleAuth />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    </div>
                </div>
            </main>
        )
    }
}

export default Loguin;