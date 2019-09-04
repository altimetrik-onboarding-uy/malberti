import React from 'react';
import { connect } from 'react-redux';
import { Modal, OverlayTrigger, Tooltip, Card, ListGroup } from 'react-bootstrap';

import exclamation from '../../assets/img/exclamation.png';
import Detail from './Detail';

class AccountingDashboard extends React.Component{

    constructor(){
        super()
        this.state = {
            modalToggle: false
        }
    }

    renderAlert(day, month){

        const d = new Date();

        if(month === d.getMonth() && day >= d.getDate() - 5){
            return (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id={`day-${day}`}>
                            Last updated in <strong>{`${day}/${month}`}</strong>
                        </Tooltip>
                    }
                >
                    <img style={{ cursor: "pointer" }} className="img-fluid" src={exclamation} alt="Exclamation sign" />
                </OverlayTrigger>
            )
        } else if(month < d.getMonth() && day >= 31-5){
            return <img className="img-fluid" src={exclamation} alt="Exclamation sign" />;
        }else{
            return <></>;
        }

    }

    renderCards(){
        return this.props.savings.map((card, i) => {
            return (
                <div className="col-md-6 col-12" key={i}>
                    <Card bg="light" style={{ cursor: "pointer" }} onClick={() => this.setState({ modalToggle: !this.state.modalToggle})}>
                        <Card.Header>
                            <div className="row no-gutters">
                                <div className="col-10">
                                    <h3 className="d-inline">{card.userName}</h3>
                                </div>
                                <div className="col-2">
                                    {this.renderAlert(card.date.day, card.date.month)}
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className="py-3">
                            <ListGroup variant="list-group-flush">
                                <ListGroup.Item>Monthly save: ${card.amount}</ListGroup.Item>
                                <ListGroup.Item>Months: {card.months}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        <Modal
                            size="md"
                            show={this.state.modalToggle}
                            onHide={() => this.setState({ modalToggle: !this.state.modalToggle})}
                            aria-labelledby="example-modal-sizes-title-md"
                        >
                            <Modal.Header closeButton>
                            <h4>{card.userName}</h4>
                            </Modal.Header>
                            <Modal.Body>
                                <Detail info={card} />
                            </Modal.Body>
                        </Modal>
                    </Card>
                </div>
            )
        })
    }

    render(){
        return(
            <div className="row">
                {this.renderCards()}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        savings: state.savings
    }
}

export default connect(mapStateToProps)(AccountingDashboard);