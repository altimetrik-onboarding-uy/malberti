import React from 'react';

class Detail extends React.Component{

    endMonth(month, qMonths){
        const endMonth = month + parseInt(qMonths);
        if(endMonth > 12){
            return endMonth - 12;
        }
        else{
            return endMonth;
        }
    }

    monthsAcomplished(month){
        const d = new Date();
        if(d.getMonth()+1 < parseInt(month)){
            return (d.getMonth() + 13) - parseInt(month);
        }else{
            return d.getMonth() + 1 - parseInt(month);
        }
    }

    monthsLeft(day, month, qMonths){

        const d = new Date();
        const endMonth = month + parseInt(qMonths);
        
        if (day <= d.getDate()){
            return endMonth - d.getMonth();
        }else{
            return endMonth - 1 - d.getMonth();
        }
    }


    render(){
        return(
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <p className="lead">Start date of savings: {this.props.info.date.day}/{this.props.info.date.month}</p>
                    <p className="lead">
                        Expected end date: {this.props.info.date.day}/{this.endMonth(this.props.info.date.month, this.props.info.months)} ({this.monthsLeft(this.props.info.date.day, this.props.info.date.month, this.props.info.months)} months left)
                    </p>
                    <p className="lead">Months accomplished: {this.monthsAcomplished(this.props.info.date.month)}</p>
                    <p className="lead">
                        Saving per month: ${this.props.info.amount}
                    </p>
                    <p className="lead">Total amount to be saved: ${this.props.info.months * this.props.info.amount} </p>
                    
                
                </div>
            </div>
        )
    }
}

export default Detail;