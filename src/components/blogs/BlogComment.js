import React, { useState } from 'react';
import { Media, Dropdown, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import BlogEditComment from './BlogEditComment';
import ProfilePicture from '../../components/ProfilePicture';
import styles from '../../styles/Comment.module.css';

const BlogComment = (props) => {
    const { profile_id, profile_image, owner, updated_at, comment, id, setComments, setBlog } = props;
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
            setShowDeleteModal(false);
        } catch (err) {

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
                <Media className='my-4 m-md-4 p-md-3 border rounded'>
                    <Link
                        to={`/profiles/${profile_id}`}
                        className='mt-2'
                    >
                        <ProfilePicture src={profile_image} />
                    </Link>
                    <Media.Body className="align-self-center ml-2 mt-2">
                        <Link className={styles.Link} to={`/profiles/${profile_id}`}>
                            <span>{owner}</span>
                        </Link>
                        <span className={styles.Date}>{updated_at}</span>
                        <p>{comment}</p>
                    </Media.Body>
                    {is_owner && (
                        <Dropdown align="right">
                            <Dropdown.Toggle variant="link" className={styles.DropdownToggle}>
                                <i className="fas fa-ellipsis-h"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setShowEditForm(true)}>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Media>
            )}

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BlogComment;
