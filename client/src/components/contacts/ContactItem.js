import React, { useContext } from 'react';
import { Badge, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import ContactContext from '../../context/contactContext';

export const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact,setCurrent,clearCurrent} = contactContext;
    const {name,_id,email,phone,type} = contact;
    const onDelete = () =>{
        deleteContact(_id);
        clearCurrent(); 
    }
    return (
    <Card body className="margin-10 card_shadow">
        <CardTitle><strong className="text-primary">{name}</strong>{' '}<Badge className="float-right" color={(type==="personal")?"primary":"success"}>{type.charAt(0).toUpperCase()+type.slice(1)}</Badge></CardTitle>
        <CardText>
                {email && (<><i class="fa fa-envelope" aria-hidden="true"></i>{' '}{email}<br/></>)}
                {phone && (<><i class="fa fa-phone" aria-hidden="true"></i>{' '}{phone}<br/></>)}
        </CardText>
        <Row>
        <Col >
        <Button color="dark" onClick={()=>setCurrent(contact)}>Edit</Button>
        </Col>
        <Col >
        <Button color="danger" onClick={onDelete} className="pull-right">Delete</Button>
        </Col>
        </Row>
    </Card>
    )
}
export default ContactItem;