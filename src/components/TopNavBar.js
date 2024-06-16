import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/fittribe_logo_coloured.png';
import styles from '../styles/TopNavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import ProfilePicture from './ProfilePicture';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const TopNavBar = () => {
    const currentUser = useCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const loggedInLinks = (
        <>
            <NavLink
                to={`/profiles/${currentUser?.profile_id}`}
                className={styles.NavLink}
            >
                <ProfilePicture src={currentUser?.profile_image} text={`${currentUser?.username}'s Profile`} height={40} />
            </NavLink>
        </>
    );
    const loggedOutLinks = (
        <>
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
        </>
    );
    return (
        <Navbar expanded={expanded} className={styles.TopNavBar} expand="md" fixed='top'>
            <Container fluid>
                <NavLink to="/">
                    <Navbar.Brand><img src={logo} alt='FitTribe Logo' height='45' /></Navbar.Brand>
                </NavLink>
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        {currentUser ? loggedInLinks : loggedOutLinks}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopNavBar;

