import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import { Container, Row, Col } from 'reactstrap';
import ContactContext from '../../context/contactContext';

const Home = () => {
    const contactContext = useContext(ContactContext);
    useEffect(()=>{
        contactContext.loadUser();
        //eslint-disable-next-line
    },[]);
    return (
       <Container>
           <Row></Row>
           <br/>
            <Row>
                <Col md="6">
                    <div  ><ContactForm/></div>
                </Col>
                <Col md="6">
                    <ContactFilter/>
                    <Contacts />
                </Col>
            </Row>
       </Container> 
    )
}
export default Home;