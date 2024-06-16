import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import logo from '../assets/fittribe_logo_coloured.png';
import styles from '../styles/TopNavBar.module.css';
import btnstyles from '../styles/Button.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import ProfilePicture from './ProfilePicture';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import axios from 'axios';

const TopNavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleLogout = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const loggedInLinks = (
        <Nav className="ml-auto d-none d-md-flex align-items-center">
            <NavLink
                to={`/profiles/${currentUser?.profile_id}`}
                className={styles.NavLink}
            >
                <ProfilePicture src={currentUser?.profile_image} text={`${currentUser?.username}`} height={40} />
            </NavLink>
        </Nav>
    );

    const loggedOutLinks = (
        <Nav className="ml-auto d-none d-md-flex">
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
                className={`${styles.NavButton} ${btnstyles.Button}`}
                activeClassName={btnstyles.ButtonActive}
            >
                SignUp
            </NavLink>
        </Nav>
    );

    const collapsedLoggedOutLinks = (
        <Nav className="d-md-none">
            <hr className={styles.Divider} />
            <NavLink
                exact
                to='/'
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
            >
                Home
            </NavLink>
            <NavLink
                to='/signin'
                className={styles.NavLink}
                activeClassName={styles.Active}
                onClick={() => setExpanded(false)}
            >
                Login
            </NavLink>
            <NavLink
                to='/signup'
                className={`${styles.NavLink} ${btnstyles.Button} mb-2`}
                activeClassName={btnstyles.ButtonActive}
                onClick={() => setExpanded(false)}
            >
                SignUp
            </NavLink>
        </Nav>
    );

    const sidebarLinks = (
        <>  
            <hr className={styles.Divider} />
            <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
                <i className="fas fa-home"></i> Home
            </NavLink>
            <NavLink to="/blogs" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
                <i className="fas fa-blog"></i> Blogs
            </NavLink>
            <NavLink to="/workouts" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
                <i className="fas fa-dumbbell"></i> Workouts
            </NavLink>
            <NavLink to="/following" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
                <i className="fas fa-user-friends"></i> Following
            </NavLink>
            <NavLink to="/groups" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
                <i className="fas fa-users"></i> Groups
            </NavLink>
            <NavLink to={`/profiles/${currentUser?.profile_id}`} className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
                <i className="fas fa-user"></i> My Profile
            </NavLink>
            <hr className={styles.Divider} />
            <Button className={`${btnstyles.Button} mb-2 ml-2`} onClick={handleLogout}>
                Logout
            </Button>
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
                    {currentUser ? (
                        <>
                            <Nav className="ml-auto text-left d-none d-md-flex">
                                {loggedInLinks}
                            </Nav>
                            <Nav className="d-md-none mt-2">
                                {sidebarLinks}
                            </Nav>
                        </>
                    ) : (
                        <>
                            {loggedOutLinks}
                            {collapsedLoggedOutLinks}
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopNavBar;
