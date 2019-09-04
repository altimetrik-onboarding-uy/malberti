import React from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import { addSaving } from '../../actions';

class SavingForm extends React.Component{

    constructor(){
        super()
        this.state ={
            amount: null,
            eAmount: '',
            months: null,
            eMonths: ''
        }
    }

    onSubmit(amount, months, userId, userName){

        const confAmount = this.checkAmount(amount);
        const confMonths = this.checkMonths(months);

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        console.log(month)
        if(confAmount && confMonths){
            const saving = {
                userId,
                userName,
                amount,
                months,
                date:{
                    day,
                    month
                }
            }
            this.props.onSubmit(saving);
        }
    }

    checkAmount(amount){
        if(amount){
            if(!isNaN(amount)){
                const eAmount = "";
                this.setState({ eAmount });
                return true
            }else{
                const eAmount = "You must fill the input with a number!";
                this.setState({ eAmount });
                return false
            }
        }else{
            const eAmount = "You must fill the input before submitting!";
            this.setState({ eAmount });
            return false
        }
    }

    checkMonths(months){
        if(months){
            if(!isNaN(months)){
                const eMonths = "";
                this.setState({ eMonths });
                return true
            }else{
                const eMonths = "You must fill the input with a number!";
                this.setState({ eMonths });
                return false
            }
        }else{
            const eMonths = "You must fill the input before submitting!";
            this.setState({ eMonths });
            return false
        }
    }

    renderInputs(){
        return(
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Amount $</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder= "Enter the amount you want to save..."
                    aria-label="Amount"
                    aria-describedby="basic-addon1"
                    onChange={(event) => this.setState({ amount: event.target.value})}
                    />
                </InputGroup>
                {this.state.eAmount ? <p className="text-danger">{this.state.eAmount}</p> : <></>}

                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Months</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder= "In how many months would you like to save?"
                    aria-label="Months"
                    aria-describedby="basic-addon1"
                    onChange={(event) => this.setState({ months: event.target.value})}
                />
                </InputGroup>
                {this.state.eMonths ? <p className="text-danger">{this.state.eMonths}</p> : <></>}
            </div>
        )
    }

    render(){
        return(
            <form onSubmit={(e) => e.preventDefault()}>
                {this.renderInputs()}
                <div className="d-inline-block ml-auto">
                    <Button
                        variant="success"
                        onClick={() => this.onSubmit(this.state.amount, this.state.months, this.props.user.userId, this.props.user.name)}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => this.props.cancelForm()}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth,
        savings: state.savings
    }
}

export default connect(mapStateToProps, { addSaving })(SavingForm);