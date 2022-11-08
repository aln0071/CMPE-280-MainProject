import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';

export default function TopNavbar({ navRef }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div ref={navRef} className="topNavBar">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/#/home">Blogger</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/#/home">Home</Nav.Link>
            <Nav.Link href="/#/createBlog">Create Blog</Nav.Link>
            <Nav.Link href="/#/blogListing">Blog Listing</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link href="/#/logout">Logout</Nav.Link>
            ) : (
              <Nav.Link href="/#/login">Sign In</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
