import {ADD_CONTACT,
        DELETE_CONTACT,
        SET_ALERT,
        REMOVE_ALERT,
        SET_CURRENT,
        UPDATE_CONTACT,
        CLEAR_CURRENT,
        FILTER_CONTACTS, 
        CLEAR_FILTER,
        REGISTER_SUCCESS,
        REGISTER_FAIL,
        CLEAR_ERRORS,
        USER_LOADED,
        AUTH_ERROR,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        CONTACT_ERROR,
        GET_CONTACT,
        CLEAR_CONTACT,
        LOGOUT} from './types';

export default (state,action)=>{
    switch(action.type){
        case GET_CONTACT:
            return{
                ...state,
                contacts:action.payload,
                loading:false
            };
        case ADD_CONTACT:
            return{
                ...state,
                contacts:[action.payload,...state.contacts],
                loading:false
            };
        case DELETE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.filter(contact => contact._id !== action.payload),
                loading:false
            };
        case SET_CURRENT:
            return{
                ...state,
                current:action.payload,
            };
        case CLEAR_CURRENT:
            return{
                ...state,
                current:null,
            };
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.map(contact=>contact._id === action.payload._id ? action.payload : contact),
                loading:false
            };
        case FILTER_CONTACTS:
            return{
                ...state,
                filtered:state.contacts.filter(contact=>{
                    const regex = new RegExp(`${action.payload}`,'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
        case CLEAR_FILTER:
            return{
                ...state,
                filtered:null,
            };
        case SET_ALERT:
            return{
                ...state,
                alerts:state.alerts.concat(action.payload)
            };
            
        case REMOVE_ALERT:
            console.log(state.alerts);
            return {
                ...state,
                alerts:state.alerts.filter(alert=>alert.id!==action.payload)
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                token:action.payload.token,
                isAuthenticated:true,
                loading:false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token:[],
                isAuthenticated:false,
                loading:false,
                user:null,
                error:action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            }
        case CONTACT_ERROR:
            return{
                ...state,
                error:action.payload
            }
        case CLEAR_CONTACT:
            return {
                ...state,
                contacts:null,
                filtered:null,
                error:null,
                current:null
            }
        default:
            return state; 
    }
}