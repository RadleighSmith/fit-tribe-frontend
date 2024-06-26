import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/SideNavBar.module.css';
import btnstyles from '../styles/Button.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { removeTokenTimestamp } from '../utils/utils';

const SideNavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const history = useHistory();


    const handleLogout = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/');
            setCurrentUser(null);
            removeTokenTimestamp();
            history.push('/signin');
        } catch (err) {

        }
    };

    if (!currentUser) return null;

    return (
        <div className={styles.SideNavBar}>
            <Nav className="flex-column">
                <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}>
                    <i className="fas fa-home"></i> Home
                </NavLink>
                <NavLink to="/blogs" className={styles.NavLink} activeClassName={styles.Active}>
                    <i className="fas fa-blog"></i> Blogs
                </NavLink>
                <NavLink to="/following" className={styles.NavLink} activeClassName={styles.Active}>
                    <i className="fas fa-user-friends"></i> Following
                </NavLink>
                <NavLink to="/groups" className={styles.NavLink} activeClassName={styles.Active}>
                    <i className="fas fa-users"></i> Groups
                </NavLink>
            </Nav>
            <div className={styles.LogoutSection}>
                <hr className={styles.Divider} />
                <Button className={`${btnstyles.Button} ${btnstyles.ButtonWide}`} onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default SideNavBar;
