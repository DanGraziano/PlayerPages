import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {useSelector, useDispatch} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import {logoutThunk} from "../services/auth-thunk";
import { Link } from 'react-router-dom';

// TODO maybe add a logo instead of PlayerPage text

const TopNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutThunk());
    navigate('/login');
  };

  return (
      <Navbar bg="light" expand="lg" className="px-xl-2 px-lg-2 px-md-2 px-sm-2">
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
                </NavDropdown>
              </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
  );
};

export default TopNavbar;