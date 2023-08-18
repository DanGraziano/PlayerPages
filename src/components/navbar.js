import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// TODO maybe add a logo instead of PlayerPage text

const TopNavbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.currentUser !== null);

  return (
      <Navbar bg="light" expand="lg" className="px-xl-2 px-lg-2 px-md-2 px-sm-2">
        <Navbar.Brand href="#">PlayerPages</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {isLoggedIn && (
                <Nav.Link href="/profile">Profile</Nav.Link>
            )}
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
          {isLoggedIn && (
              <Nav className="ms-auto">
                <NavDropdown
                    title={<FontAwesomeIcon icon={faUser} />}
                    id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">Edit Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
  );
};

export default TopNavbar;