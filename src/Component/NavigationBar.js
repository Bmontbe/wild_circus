import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import Home from './Home/Home';
import './NavigationBar.css';

function NavigationBar() {
  const [toggle, setToggle] = useState(false)

  const isOpen = () => {
    setToggle(!toggle)
  }

  return (
    <div>
      <Navbar color="light" className="navigationBar" light expand="md">
        <NavbarBrand>
          <Link to={`${process.env.PUBLIC_URL}/`} component={Home}>
            <img src={`${process.env.PUBLIC_URL}/assets/pics/logoCircus.png`} alt="logo Circus" id="logo" />
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={isOpen} />
        <Collapse isOpen={toggle} navbar>
          <Nav className="ml-auto" navbar> 
            <NavItem>
              <Link to={`${process.env.PUBLIC_URL}/histoire`} className='linkNavbar' href="#">Notre histoire</Link>
            </NavItem>
            <NavItem>
              <Link to={`${process.env.PUBLIC_URL}/spectacles`} className='linkNavbar' href="#">Nos spectacles</Link>
            </NavItem>
            <NavItem>
              <Link to={`${process.env.PUBLIC_URL}/compte`} className='linkNavbar' href="#">Espace administrateur</Link>
            </NavItem>
            <NavItem>
              <Link to={`${process.env.PUBLIC_URL}/panier`} className='linkNavbar' href="#">Panier</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;