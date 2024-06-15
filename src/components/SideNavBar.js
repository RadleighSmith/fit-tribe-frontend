import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/SideNavBar.module.css';
import btnstyles from '../styles/Button.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SideNavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const history = useHistory()


    const handleLogout = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/');
            setCurrentUser(null);
            history.push("/signin")
        } catch (err) {
            console.log(err);
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
                <NavLink to="/workouts" className={styles.NavLink} activeClassName={styles.Active}>
                    <i className="fas fa-dumbbell"></i> Workouts
                </NavLink>
                <NavLink to="/following" className={styles.NavLink} activeClassName={styles.Active}>
                    <i className="fas fa-user-friends"></i> Following
                </NavLink>
                <NavLink to="/groups" className={styles.NavLink} activeClassName={styles.Active}>
                    <i className="fas fa-users"></i> Groups
                </NavLink>
                <hr className={styles.Divider} />
                <div>
                    <div className={styles.MyGroupsHeader}>My Groups</div>
                    {/* Add a list of user's groups here later */}
                </div>
            </Nav>
            <div className={styles.LogoutSection}>
                <hr className={styles.Divider} />
                <Button className={btnstyles.Button} onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default SideNavBar;
