import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/fittribe_logo_coloured.png';
import styles from '../styles/TopNavBar.module.css';
import { NavLink } from 'react-router-dom';

const TopNavBar = () => {
    return (
        <Navbar className={styles.TopNavBar} expand="md" fixed='top'>
            <Container fluid >
                <NavLink to="/">
                    <Navbar.Brand><img src={logo} alt='FitTribe Logo' height='45' /></Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            exact
                            to='/'
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to='/signin'
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to='/signup'
                            className={styles.NavButton}
                            activeClassName={styles.NavButtonActive}
                        >
                            Sign Up
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopNavBar;
