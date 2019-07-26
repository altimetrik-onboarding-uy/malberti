import React from 'react';

import { connect } from 'react-redux';

import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';

import { logOut } from '../actions';

class Navigation extends React.Component{

    renderDropdown(){
        switch(this.props.homeState){
            case 'passwordChange':
                return (
                    <div>
                        <Dropdown.Item eventKey="1" onClick={() =>this.props.showHome()}>
                            Back to home
                        </Dropdown.Item>
                        {this.props.logged.admin ? 
                            <Dropdown.Item eventKey="2" onClick={() =>this.props.showAdmin()}>
                                See all users
                            </Dropdown.Item> 
                        :
                        <div></div>
                        }
                    </div>  
                )
            case 'userAdmin':
                return (
                    
                    <div>
                        <Dropdown.Item eventKey="1" onClick={() =>this.props.showPasswordForm()}>
                            Change password
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() =>this.props.showHome()}>
                            Back to home
                        </Dropdown.Item>
                    </div>  
                )
            default:
                return (
                    <div>
                        <Dropdown.Item eventKey="1" onClick={() =>this.props.showPasswordForm()}>
                            Change password
                        </Dropdown.Item> 
                        {this.props.logged.admin ? 
                            <Dropdown.Item eventKey="2" onClick={() =>this.props.showAdmin()}>
                                See all users
                            </Dropdown.Item>
                        :
                        <div></div>
                        }
                    </div>  
                )
        }
    }

    render(){
        return(
            <Navbar bg="dark" variant="dark" className="px-5">
                <Navbar.Brand onClick={() => this.props.showHome()}>Loggy</Navbar.Brand>
                <Nav.Item className="ml-auto">
                    {/* <h5 className="text-white mr-3 mb-0 d-inline">Welcome {this.props.user}</h5> */}
                    <DropdownButton
                        alignRight
                        title="Manage"
                        id="dropdown-menu"
                        variant="outline-info"
                        size="sm"
                        className="d-inline"
                    >
                        {this.renderDropdown()}
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4" className="text-danger" onClick={() => this.props.logOut()}>Log Out</Dropdown.Item>
                    </DropdownButton>
                </Nav.Item>
            </Navbar>
        )
    }
}
function mapStateToProps(state){
    return{
        logged: state.loggedUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(logOut())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(Navigation);