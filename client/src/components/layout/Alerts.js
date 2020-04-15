import React, { useContext } from 'react'
import ContactContext from '../../context/contactContext';
import { Alert } from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const Alerts = () => {
    const contactContext = useContext(ContactContext);
    const {alerts} = contactContext;
    return (
        alerts.length > 0 && alerts.map(alert=>(
            <TransitionGroup>
            <CSSTransition key={alert.id} timeout={500} classNames="item">
            <Alert key={alert.id} color={`${alert.type}`}>
                <i className="fa fa-info-circle"/> {alert.msg}
            </Alert>
            </CSSTransition>
            </TransitionGroup>
        ))
    )
}
export default Alerts;
