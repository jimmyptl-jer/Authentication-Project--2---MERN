import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
      {/* Navigation bar */}
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            {/* Brand or title of the web application */}
            <Navbar.Brand >
              MERN APP
            </Navbar.Brand>
          </LinkContainer>

          {/* Toggle button for small screens */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          {/* Collapsible navigation menu */}
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* Navigation links */}
            <Nav className='ms-auto'>
              <LinkContainer to='/login'>
                {/* Sign In link with icon */}
                <Nav.Link>
                  <FaSignInAlt /> Sign IN
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
                {/* Sign Up link with icon */}
                <Nav.Link>
                  <FaSignOutAlt /> Sign Up
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
