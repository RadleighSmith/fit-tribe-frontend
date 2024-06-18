import React from 'react';
import { Link } from 'react-router-dom';
import { Media, Image } from 'react-bootstrap';
import styles from '../styles/Comment.module.css';
import profileStyles from '../styles/ProfilePicture.module.css';

const BlogComment = ({ owner, profile_id, profile_image, comment, created_at }) => {
    return (
        <Media className="mb-3">
            <Link to={`/profiles/${profile_id}`} className={profileStyles.ProfileLink}>
                <Image src={profile_image} roundedCircle className={profileStyles.ProfileImage} />
            </Link>
            <Media.Body className="ml-3">
                <Link to={`/profiles/${profile_id}`} className={profileStyles.ProfileLink}>
                    <h5 className="mt-0">{owner}</h5>
                </Link>
                <p className={styles.CommentText}>{comment}</p>
                <small className="text-muted">{created_at}</small>
            </Media.Body>
        </Media>
    );
};

export default BlogComment;
