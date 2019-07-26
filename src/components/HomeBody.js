import React from 'react';

import { connect } from 'react-redux';

import {fetchImages} from '../actions'

import PhotoItem from './PhotoItem'

class HomeBody extends React.Component{

    componentDidMount(){
        this.props.fetchImages();
    }

    render(){
        return(
            <section className="container">
                <div className="row">
                    <div className="col-10 mx-auto mt-3">
                        <h1 className="display-3">Welcome {this.props.logged.user}</h1>
                        <p className="lead">These are the photos that Unsplash has for you today!</p>
                        <p className="lead">If you want to see more visit <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a> or click on the "more" button below the photos to see more from this artists.</p>
                    </div>
                    <div className="col-11 mx-auto">
                        <hr className="mx-3"/>
                    </div>
                </div>
                <div className="row">
                    {this.props.posts.map((el, i) => {
                        return(
                            <article className="col-lg-3 mt-5" key={i}>
                                <PhotoItem info={el} />
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state){
    return{
        logged: state.loggedUser,
        posts: state.posts
    }
}

export default connect(mapStateToProps, { fetchImages })(HomeBody);
