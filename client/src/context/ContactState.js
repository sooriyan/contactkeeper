import React,{useReducer} from 'react';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_ALERT,
    SET_CURRENT,
    UPDATE_CONTACT,
    CLEAR_CURRENT,
    FILTER_CONTACTS, 
    CLEAR_FILTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    REMOVE_ALERT,
    CONTACT_ERROR,
    GET_CONTACT,
    CLEAR_CONTACT
    } from './types';
const ContactState = props =>{
    const initialState = {
        contacts:null,
        current:null,
        filtered:null,
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        error:null,
        user:null,
        alerts:[],
        token:[]
    };
    const [state,dispatch] = useReducer(contactReducer,initialState);
    //GET contacts 
    const getContact = async () =>{
        try {
            const res = await axios.get('/api/contacts');
            dispatch({type:GET_CONTACT,payload:res.data});
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.message})            
        }
    }
    //Add Contact
    const addContact = async contact =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts',contact,config);
            dispatch({type:ADD_CONTACT,payload:contact});
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.message})            
        }
    }
    //Delete Contact
    const deleteContact =async id =>{
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({type:DELETE_CONTACT,payload:id});
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.message})            
        }
    }
    //Clear Contacts
    const clearContact = ()=>{
        dispatch({type:CLEAR_CONTACT});
    }
    //Set Current Contact
    const setCurrent = contact=>{
        dispatch({type:SET_CURRENT,payload:contact});
    }
    //Clear Current Contact
    const clearCurrent = () =>{
        dispatch({type:CLEAR_CURRENT})
    }
    //Update Contact
    const updateContact = async contact =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config);
            dispatch({type:UPDATE_CONTACT,payload:res.data});
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.message})            
        }
    }
    //Filter Contacts
    const filterContact = text =>{
        dispatch({type:FILTER_CONTACTS,payload:text})
    }
    //Clear Filter
    const clearFilter = () =>{
        dispatch({type:CLEAR_FILTER});
    }
    //Load User
    const loadUser =async ()=> {
        // @todo - load token into global header
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({type:USER_LOADED,payload:res.data});
        } catch (error) {
            dispatch({type:AUTH_ERROR});
        }
    };
    //Register User
    const register = async formData =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        try{
            const res=await axios.post('/api/users',formData,config);
            dispatch({type:REGISTER_SUCCESS,payload:res.data});
            loadUser();
        }catch(err){
            dispatch({type:REGISTER_FAIL,payload:err.response.data.message});
        }
    };
    //Login User
    const login = async formData =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        try{
            const res=await axios.post('/api/auth',formData,config);
            dispatch({type:LOGIN_SUCCESS,payload:res.data});
            loadUser();
        }catch(err){
            dispatch({type:LOGIN_FAIL,payload:err.response.data.message});
        }
    };
    
    //Logout
    const logout = ()=> dispatch({type:LOGOUT});

    //Clear Errors
    const clearErrors = ()=> dispatch({ type:CLEAR_ERRORS });

    //Set Alert
    const setAlert = (msg,type) =>{
        const id = uuid();
        dispatch({
            type:SET_ALERT,
            payload:{msg,type,id}
        })
        setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),5000)
    }
    return(
        <ContactContext.Provider
            value={{
                contacts:state.contacts,
                current:state.current,
                filtered:state.filtered,
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                user:state.user,
                error: state.error,
                alerts:state.alerts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContact,
                clearFilter,
                setAlert,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
                getContact,
                clearContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );        
    
};
export default ContactState;