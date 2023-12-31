import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {useSelector, useDispatch} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import {logoutThunk} from "../services/auth-thunk";
import { Link } from 'react-router-dom';
import React from "react";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);


  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutThunk());
    navigate('/login');
  };

  return (
      <Navbar bg="tan" expand="lg" className="px-xl-2 px-lg-2 px-md-2 px-sm-2 icon-link-hover">
        <Navbar.Brand as={Link} to="/">PlayerPages</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isLoggedIn && (
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            )}
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
          </Nav>
          {isLoggedIn && (
              <Nav className="ms-auto">
                <NavDropdown
                    title={<FontAwesomeIcon icon={faUser} />}
                    id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>

                  {currentUser?.accountType === 'moderator' && (
                      <NavDropdown.Item as={Link} to="/admin">Admin</NavDropdown.Item>)}
                </NavDropdown>
              </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
  );
};

export default TopNavbar;