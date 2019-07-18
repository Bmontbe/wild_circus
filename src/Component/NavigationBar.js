import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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

function NavigationBar(props) {
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
              <Link to={`${process.env.PUBLIC_URL}/espaceAdmin`} className='linkNavbar' href="#">Espace administrateur</Link>
            </NavItem>
            <NavItem>
              <Link to={`${process.env.PUBLIC_URL}/panier`} className='linkNavbar' href="#">{props.basket && props.basket.length > 0 ? `Panier (${props.basket.length})` : "Panier"}</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = state => ({
  basket: state.basket
});

export default connect(mapStateToProps)(NavigationBar);