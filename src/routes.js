import React from 'react'
import Login from './components/login/login'
import { isAuthenticated } from './config/auth';
import {
    Switch,
    Route,
    Redirect,
    Router
} from "react-router-dom";
import User from './views/User';
import ErrorHandler from './views/errors/errors';
import history from './config/history';


const CustomRoute = ({ ...rest }) => {  
    if (!isAuthenticated()) {
        return <Redirect to='/login' />  
    }
    return <Route {...rest} /> 
}

const Routers = () => (
    <Router history={history} >
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/erro/:erro" component={ErrorHandler} />
            
            <CustomRoute path="/" component={User} />

        </Switch>
    </Router>
)

export default Routers;
