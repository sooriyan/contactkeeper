import React,{useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import ContactContext from '../../context/contactContext';
const PrivateRoute = ({component:Component,...rest}) => {
    const contactContext = useContext(ContactContext);
    const {isAuthenticated,loading}= contactContext;
    return (
        <Route {...rest} render={props=>!isAuthenticated && !loading ? (
            <Redirect to='/login'/>
        ) : (
            <Component {...props}/>
        )} />
    )
}
export default PrivateRoute;
