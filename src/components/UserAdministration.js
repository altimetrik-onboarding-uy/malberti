import React from 'react';

import {connect} from 'react-redux';
import { Table, Button } from 'react-bootstrap';

import { actUser, deleteAccount } from '../actions';

class UserAdministration extends React.Component{

    togglePermit(user){
        let modified = user;
        modified.admin = !modified.admin;
        this.props.actUser(modified);
    }

    deleteAccount(user){
        this.props.deleteAccount(user);
    }

    render(){
        return(
            <section className="container">
                <div className="row">
                    <article className="col-lg-8 col-md-10 mx-auto my-5">
                        <h2 className="display-4 my-3">User management</h2>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Password</th>
                                    <th>Permission</th>
                                    <th>Delete account</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.list.map((account, i) => {
                                    return(
                                        <tr key={i}>
                                            <td>{account.user}</td>
                                            <td>{account.password}</td>
                                            <td>{account.admin ? 
                                                    <Button variant="outline-success" onClick={()=> this.togglePermit(account)}>
                                                        Admin
                                                    </Button>
                                                    :
                                                    <Button variant="outline-warning" onClick={()=> this.togglePermit(account)}>
                                                        Normal
                                                    </Button>
                                                }
                                            </td>
                                            <td>
                                                {account.user !== this.props.logged.user ? 
                                                    <Button variant="outline-danger" onClick={()=> this.deleteAccount(account)}>
                                                        Delete
                                                    </Button>
                                                    :
                                                    <p className="text-muted">You can't delete your own account!</p>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </article>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state){
    return{
        logged: state.loggedUser,
        list: state.users
    }
}

export default connect(mapStateToProps, { actUser, deleteAccount })(UserAdministration);