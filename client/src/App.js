import React, { Fragment } from 'react';
import './App.css';
import MainNavbar from './components/layout/Navbar';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/ContactState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <ContactState>
    <Router>
    <Fragment>
      <MainNavbar title="Contact Keeper" icon="fas fa-id-card-alt"/>
      <Alerts/>
      <Switch>
        <PrivateRoute exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </Fragment>
    </Router>
    </ContactState>
  );
}

export default App;
