import React from 'react';
import styles from '../styles/ProfilePicture.module.css';

const ProfilePicture = ({ src, height = 45, text }) => {
    return (
        <span className={styles.ProfilePictureNavContainer}>
            <span className={styles.ProfileNavText}>{text}</span>
            <img
                className={styles.ProfilePictureNavBar}
                src={src}
                height={height}
                width={height}
                alt="profile"
            />

        </span>
    );
};

export default ProfilePicture;
