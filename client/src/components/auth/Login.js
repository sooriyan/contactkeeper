import React,{useState, useContext, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col,Container } from 'reactstrap';
import ContactContext from '../../context/contactContext';
export const Login = (props) => {
    const contactContext = useContext(ContactContext);
    const {setAlert,login,error,clearErrors,isAuthenticated} = contactContext;
    useEffect(()=>{
        if(localStorage.token){
            props.history.push('/');
        }
        if(error==='Invalid Credentials'){
            setAlert(error,'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    },[error,isAuthenticated,props.history]);
    const [user,setUser] = useState({
        email:'',
        password:'',
    });
    const {email,password} = user;
    const onChange = e =>setUser({...user,[e.target.name]:e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        if(email===''||password===''){
            setAlert('Please fill in all fields','danger');
        }else{
            login({
                email,password
            });
        }
    };
    return (
        <Container>
            <br/>
        <Row>
            <Col md={3}></Col>
            <Col md={6}>
        <Form onSubmit={onSubmit}>
            <Row><Col className="text-center"><h5 className="text-primary">Login</h5></Col></Row>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Password</Label>
                <Input type="password" name="password" placeholder="Password" value={password} onChange={onChange} />
            </FormGroup>
            <Button color="primary" className="w-100">Login</Button>
        </Form>
        </Col>        
        <Col md={3}></Col>
        </Row>
        </Container>
    )
}
export default Login
