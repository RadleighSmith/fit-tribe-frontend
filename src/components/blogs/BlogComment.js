import React, { useState } from 'react';
import { Media, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import BlogEditComment from './BlogEditComment';
import ProfilePicture from '../../components/ProfilePicture';
import styles from '../../styles/Comment.module.css';

const BlogComment = (props) => {
    const { profile_id, profile_image, owner, updated_at, comment, id, setComments, setBlog } = props;
    const [showEditForm, setShowEditForm] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/blog-comments/${id}/`);
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
            setBlog((prevBlog) => ({
                ...prevBlog,
                blog_comments_count: prevBlog.blog_comments_count - 1,
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {showEditForm ? (
                <BlogEditComment
                    id={id}
                    comment={comment}
                    setComments={setComments}
                    setShowEditForm={setShowEditForm}
                />
            ) : (
                <Media>
                    <Link to={`/profiles/${profile_id}`}>
                        <ProfilePicture src={profile_image} />
                    </Link>
                    <Media.Body className="align-self-center ml-2">
                        <span className={styles.OwnerName}>{owner}</span>
                        <span className={styles.Date}>{updated_at}</span>
                        <p>{comment}</p>
                    </Media.Body>
                    {is_owner && (
                        <Dropdown alignRight>
                            <Dropdown.Toggle variant="link" className={styles.DropdownToggle}>
                                <i className="fas fa-ellipsis-h"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setShowEditForm(true)}>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleDelete}>
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Media>
            )}
        </>
    );
};

export default BlogComment;

