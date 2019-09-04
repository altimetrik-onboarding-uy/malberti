import React from 'react';
import {connect} from 'react-redux';
import { Table, Button } from 'react-bootstrap';

import EditSavingForm from './EditSavingForm';

class PersonalDashboard extends React.Component{

    constructor(){
        super()
        this.state = {
            showEdit: false
        }
    }

    totalSave(){
        const { amount, months } = this.props.userSaving;
        if(amount !== 0 && months !== 0){
            return amount * months;
        }else{
            return 0;
        }
    }

    toggleForm(){
        this.setState ({ showEdit: !this.state.showEdit })
    }

    render(){
        return(
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Amount to save</th>
                            <th>Months Saving</th>
                            <th>Saving per month</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${this.props.userSaving.amount}</td>
                            <td>{this.props.userSaving.months}</td>
                            <td>${this.totalSave()}</td>
                        </tr>
                    </tbody>
                </Table>

                <div className="row">
                    {
                        this.state.showEdit ?
                        <div className="col-12">
                            <EditSavingForm cancelForm={this.toggleForm.bind(this)} sendMessage={this.props.sendMessage} />
                        </div> 
                        :
                        <div className="col-12">
                            <Button variant="warning" onClick={() => this.setState({ showEdit: true })}>Edit</Button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return({
        user: state.auth,
        savings: state.savings
    })
}

export default connect(mapStateToProps)(PersonalDashboard);