import React, { useContext,useRef, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import ContactContext from '../../context/contactContext';
export const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');
    const {filterContact,clearFilter,filtered} = contactContext;
    useEffect(()=>{
        if(filtered === null){
            text.current.value = '';
        }
    })
    const  onChange = e =>{
        if(e.target.value !== ''){
            filterContact(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <div>
                <Input type="text" ref={text} placeholder="Filter Contacts"  onChange={onChange} />
        </div>
    )
}
export default ContactFilter;
