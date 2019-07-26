
import React from 'react';

import { Card, DropdownButton, Dropdown } from 'react-bootstrap';


class PhotoItem extends React.Component{

    render(){
        return(
            <Card bg="light" >
                <Card.Img variant="top" src={this.props.info.urls.regular} />
                <Card.Body>
                    <Card.Title>{this.props.info.user.name}</Card.Title>
                        <div>
                            <Card.Text>{this.props.info.user.total_likes} Likes</Card.Text>
                            {this.props.info.description !== null ? this.props.info.description : <Card.Text className="text-muted">Looks like there is no description!</Card.Text>}
                            {this.props.info.user.location !== null ? <Card.Text>From: {this.props.info.user.location}</Card.Text> : <div></div>}
                        </div>
                    <div className="d-flex justify-content-end mt-3">
                        <DropdownButton
                            title="More.."
                            id="dropdown-menu-align-right"
                            variant="outline-info"
                            size="sm"
                        >
                            <Dropdown.Item eventKey="1" rel="noopener noreferrer" href={`https://www.instagram.com/${this.props.info.user.instagram_username}`} target="_blank" >
                                See on instagram
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2" rel="noopener noreferrer" href={this.props.info.user.portfolio_url} target="_blank">
                                See user's page
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3" rel="noopener noreferrer" href={this.props.info.user.links.html} target="_blank">
                                See Unsplash profile
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4" rel="noopener noreferrer" download href={this.props.info.links.download} target="_blank" >Full size picture</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default PhotoItem;