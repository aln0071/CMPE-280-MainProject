import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth';

export default function TopNavbar({ navRef }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleLogoutClick = () => {
    dispatch(logout());
    // navigate('/');
    window.location.reload();
  };

  return (
    <div ref={navRef} className="topNavBar">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/#/home">Blogger</Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/home">Home</Nav.Link>
              {currentUser && <Nav.Link href="/#/createBlog">Create Blog</Nav.Link>}
              <Nav.Link href="/#/blogListing">Blog Listing</Nav.Link>
              <Nav.Link href="/#/blog">Blog </Nav.Link>
            </Nav>
            {currentUser && (
              <Nav>
                <Nav.Link href="/#/profile">Profile</Nav.Link>
                <Nav.Link onClick={handleLogoutClick}> Logout</Nav.Link>
              </Nav>
            )}
            {!currentUser && (
              <Nav>
                <Nav.Link href="/#/register">Sign Up</Nav.Link>
                <Nav.Link href="/#/login"> Log In</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
