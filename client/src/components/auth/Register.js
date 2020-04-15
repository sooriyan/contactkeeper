import React,{useState, useContext, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col,Container } from 'reactstrap';
import ContactContext from '../../context/contactContext';
const Register = props => {
    const contactContext = useContext(ContactContext);
    const {setAlert,register,error,clearErrors,isAuthenticated} = contactContext;
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    useEffect(()=>{
        if(localStorage.token){
            props.history.push('/');
        }
        if(error==='User already exist'){
            setAlert(error,'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    },[error,isAuthenticated,props.history]);
    const {name,email,password,password2} = user;
    const onChange = e =>setUser({...user,[e.target.name]:e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        if(name===''||email===''||password === ''){
            setAlert('Please fill all the fields','danger');
        }else if(password!==password2){
            setAlert('Passwords do not match','danger');
        }
        else{
            register({name,email,password});
        }
    };

    return (
        <Container>
            <br/>
            <Row><Col md={3}></Col>
            <Col md={6}>
        <Form onSubmit={onSubmit}>
            <Row><Col className="text-center"><h5 className="text-primary">Register Account</h5></Col></Row>
            <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input type="text" name="name" placeholder="Name" value={name} onChange={onChange} required/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Password</Label>
                <Input type="password" name="password" placeholder="Password" value={password} onChange={onChange} minLength="6"/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Confirm Password</Label>
                <Input type="password" name="password2" placeholder="Confirm Password" value={password2} onChange={onChange} minLength="6"/>
            </FormGroup>
            <Button color="primary" className="w-100">Register</Button>
        </Form>
        </Col>
        <Col md={3}></Col>
        </Row>
        </Container>
    )
}
export default Register;