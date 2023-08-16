import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import React from "react";

// TODO add links and maybe add a logo instead of PlayerPage text
// TODO add user identification and logout functionality when user logged in

const TopNavbar = () => {
  return (
      <Navbar bg="light" expand="lg" className="px-xl-5 px-lg-5 px-md-3 px-sm-3">
        <Navbar.Brand href="#">PlayerPages</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Profile</Nav.Link>
            <Nav.Link href="#">Login</Nav.Link>
            <Nav.Link href="#">Register</Nav.Link>
            <Nav.Link href="#">Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
};

export default TopNavbar;