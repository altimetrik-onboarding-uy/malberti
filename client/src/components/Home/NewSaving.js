import React from 'react';
import { connect } from 'react-redux';
import SavingForm from './SavingForm';
import { addSaving, fetchSavings } from '../../actions';

class NewSaving extends React.Component{

    constructor(){
        super()
        this.state ={
            amount: null,
            eAmount: '',
            months: null,
            eMonths: ''
        }
    }

    async handleSubmit(saving){
        await this.props.addSaving(saving);
        const date = new Date();
        if(date.getDate() >= 27){
            this.props.sendMessage("This saving will be effective for the next salary.");
        }
        this.props.fetchSavings();
    }

    async cancelForm(){
        const { userId, name } = this.props.user;

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;

        const saving = {
            userName: name,
            userId,
            amount: 0,
            months: 0,
            date: {
                day,
                month
            }
        }
        await this.props.addSaving(saving);
        this.props.fetchSavings();
    }

    render(){
        return(
            <SavingForm onSubmit={this.handleSubmit.bind(this)} cancelForm={this.cancelForm.bind(this)} />
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth,
        savings: state.savings
    }
}

export default connect(mapStateToProps, { addSaving, fetchSavings })(NewSaving);