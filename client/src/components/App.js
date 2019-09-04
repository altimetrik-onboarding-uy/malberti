import React from 'react';
import { Router , Route } from 'react-router-dom';
import history from '../history'

import Loguin from './Loguin/Loguin';
import Home from './Home/Home';

class App extends React.Component{

    render(){
        return(
            <div>
                <Router history={history} >
                    <Route path='/' exact component={Loguin} />
                    <Route path='/home' component={Home} />
                </Router>
            </div>
        )
    }
}

export default App;