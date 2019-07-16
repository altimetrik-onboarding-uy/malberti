import React, {Component} from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Nav extends Component{

    constructor(){
        super()
        this.state = {
            userName: 'Username',
            boardName: '',
            showForm: false,
            error: ''
        }
    }

    setBoardName(){
        if(this.state.boardName){
            this.setState({
                showForm: true,
                error: ''
            })
        }
        else{
            this.setState({
                error: 'You must fill the input before pressing set!'
            })
        }
    }

    editBoardName(){
        this.setState({
            boardName: '',
            showForm: false,
            error: ''
        })
    }

    form(){
        return(       
            <div className="d-inline-block">
                <Form inline className="mx-auto">
                    <Form.Control 
                        type="text" 
                        placeholder="Name" 
                        className="mr-sm-2" 
                        onChange={event => this.setState({ boardName: event.target.value })}
                    />
                    <Button variant="outline-info" onClick={() => this.setBoardName()}>Set</Button>
                </Form>
                    {this.state.error ? <p className="error">{this.state.error}</p> : <div></div>}
            </div>
        )
    }
    title(){
        return(
            <div className="d-flex align-items-end">
                <h1 className="m-0">{this.state.boardName}</h1>
                <p className="m-0" onClick={() => this.editBoardName()}>Edit</p>
            </div>
        )
    }

    render(){

        let form = this.state.showForm ? this.title() : this.form();

        return(

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#">Boardy</Navbar.Brand>
                <div className="mx-auto">
                    {form}
                </div>
                <div >
                    <Navbar.Brand href="#">{this.state.userName}</Navbar.Brand>
                </div>
            </Navbar>
        )
    }
}

export default Nav;