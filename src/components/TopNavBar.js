import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/fittribe_logo_coloured.png';
import styles from '../styles/TopNavBar.module.css';

const TopNavBar = () => {
    return (
        <Navbar className={styles.TopNavBar} expand="md" fixed='top'>
            <Container>
                <Navbar.Brand><img src={logo} alt='FitTribe Logo' height='45' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <Nav.Link className={styles.navlink}>Home</Nav.Link>
                        <Nav.Link className={styles.navlink}>Login</Nav.Link>
                        <Nav.Link className={styles.navbutton}>Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopNavBar;
