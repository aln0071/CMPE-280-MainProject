import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function TopNavbar({navRef}) {
    return (
        <div
            ref={navRef}
            className="topNavBar"
        ><Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/#/home">Blogger</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/#/home">Home</Nav.Link>
                        <Nav.Link href="/#/createBlog">Create Blog</Nav.Link>
                        <Nav.Link href="/#/blogListing">Blog Listing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar></div>
    );
}