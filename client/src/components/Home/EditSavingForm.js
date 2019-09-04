import React from 'react';
import { connect } from 'react-redux';

import SavingForm from './SavingForm';
import {editSaving, fetchSavings} from '../../actions';

class EditSavingForm extends React.Component{

    async handleSubmit(saving){
        await this.props.editSaving(saving);
        const date = new Date();
        if(date.getDate() >= 27){
            this.props.sendMessage("This saving will be effective for the next salary.");
        }
        this.props.fetchSavings(this.props.user.userId);
    }

    render(){
        return (
            <SavingForm onSubmit={this.handleSubmit.bind(this)} cancelForm={this.props.cancelForm} />
        )
    }

}

const mapStateToProps = (state) =>{
    return{
        user: state.auth,
        savings: state.savings
    }
}


export default connect(mapStateToProps, { editSaving, fetchSavings })(EditSavingForm);