import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import ContactContext from '../../context/contactContext';
export const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })
    const { name, email, phone, type } = contact;
    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });
    const {addContact,updateContact,clearCurrent,current} = contactContext;
    useEffect(()=>{
        if(current!=null){
            setContact(current)
        }else{
            setContact({
                name: '',
            email: '',
            phone: '',
            type: 'personal'
            });
        }
    },[contactContext,current]);
    const clearAll = ()=>{
        clearCurrent();
    }
    const onSubmit = e =>{
        e.preventDefault();
        if(current ===null){
            addContact(contact);
        }else{
            updateContact(contact);
            clearCurrent();
        }
        setContact({
            name: '',
        email: '',
        phone: '',
        type: 'personal'
        });
    };
    return (
        <div>
        <Form onSubmit={onSubmit}>
            <br/>
    <Row><Col className="text-center"><strong className="text-primary">{current ?'Edit Contact' : 'Add Contact'}</strong></Col></Row>
            <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input type="text" name="name" placeholder="Name" value={name} onChange={onChange} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Phone</Label>
                <Input type="number" name="phone" placeholder="phone" value={phone} onChange={onChange} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Contact Type</Label>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="type" value="personal" checked={type === "personal"} onChange={onChange} />{' '}
                        Personal
                     </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="type" value="professional" checked={type === "professional"} onChange={onChange}/>{' '}
                        Professional
                     </Label>
                </FormGroup>
            </FormGroup>
            <Button color="primary w-100" >{current ?'Update' : 'Submit'}</Button>
            <br/>
            {current &&  <Button color="dark w-100 margin-top-10" onClick={clearAll}>Clear</Button>}
        </Form>
        </div>
    )
}
export default ContactForm
