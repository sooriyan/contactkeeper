import React, { useState, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import ContactContext from '../../context/contactContext';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const MainNavbar = ({ title, icon }) => {
  const contactContext = useContext(ContactContext);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user,clearContact } = contactContext;
  const onLogout = ()=>{
    logout();
    clearContact();
  }
  const authLinks = (
    <Fragment>
      <NavItem className="link_style">
        Hello {user && user.name}
      </NavItem>
      <NavItem onClick={onLogout} className="link_style pointer">
        <i className="fa fa-sign-out"/>{' '}Logout
      </NavItem>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <NavItem>
            <Link to='/login' className="link_style" >Login</Link>
          </NavItem>
          <NavItem>
            <Link to='/register' className="link_style" >Register</Link>
          </NavItem>
    </Fragment>
  );
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/"><i className="fa fa-address-book " aria-hidden="true"></i> {title}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto"></Nav>
        <Nav navbar>
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default MainNavbar;